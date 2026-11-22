import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { test } from 'node:test';
import { makeHandler } from './api/orientation.mjs';

const token = 'a'.repeat(64);
const env = {
  VERCEL_ENV: 'preview',
  IHA_AI_ACCESS_TOKENS: token,
  IHA_QUOTA_SUPABASE_URL: 'https://example.supabase.co',
  IHA_QUOTA_SUPABASE_SECRET_KEY: 'sb_secret_fake',
  OPENAI_API_KEY: 'openai-fake',
  ANTHROPIC_API_KEY: 'anthropic-fake',
};
const sample = { provider: 'openai', model: 'gpt-4.1-mini', scenario: 'refund' };

async function run({ body = sample, headers = {}, method = 'POST', config = {}, quota = true, providerFails = false } = {}) {
  const calls = [];
  const request = Readable.from([JSON.stringify(body)]);
  request.method = method;
  request.headers = { authorization: 'Bearer ' + token, 'content-type': 'application/json', ...headers };
  const response = {
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    end(bodyText) { this.body = JSON.parse(bodyText); },
  };
  await makeHandler({ ...env, ...config }, async (url, options) => {
    calls.push({ url, headers: options.headers, body: JSON.parse(options.body) });
    if (calls.length === 1) return { ok: quota !== null, json: async () => quota };
    return {
      ok: !providerFails,
      json: async () => url.includes('openai.com')
        ? { choices: [{ message: { content: 'Orientación ficticia' } }] }
        : { content: [{ type: 'text', text: 'Orientación ficticia' }] },
    };
  })(request, response);
  return { status: response.statusCode, body: response.body, headers: response.headers, calls };
}

test('routes both providers and sends only the predefined prompt to each', async () => {
  for (const [provider, model, host] of [
    ['openai', 'gpt-4.1-mini', 'api.openai.com'],
    ['openai', 'gpt-4.1-nano', 'api.openai.com'],
    ['anthropic', 'claude-haiku-4-5-20251001', 'api.anthropic.com'],
    ['anthropic', 'claude-haiku-5-5', 'api.anthropic.com'],
  ]) {
    const response = await run({ body: { ...sample, provider, model } });
    assert.equal(response.status, 200);
    assert.equal(response.body.model, model);
    assert.equal(response.headers['cache-control'], 'no-store');
    const [quota, upstream] = response.calls;
    assert.match(quota.body.caller_hash, /^[a-f0-9]{64}$/);
    assert.notEqual(quota.body.caller_hash, token);
    assert.equal(new URL(upstream.url).hostname, host);
    assert.match(upstream.body.messages.find((message) => message.role === 'user').content, /ficticia/);
    assert.ok(!JSON.stringify(upstream).includes(token));
    if (provider === 'openai') assert.equal(upstream.body.store, false);
  }
});

for (const [label, options, status] of [
  ['production', { config: { VERCEL_ENV: 'production' } }, 404],
  ['unsupported method', { method: 'GET' }, 405],
  ['missing token', { headers: { authorization: '' } }, 401],
  ['wrong token', { headers: { authorization: 'Bearer ' + 'b'.repeat(64) } }, 401],
  ['missing token configuration', { config: { IHA_AI_ACCESS_TOKENS: '' } }, 503],
  ['browser origin', { headers: { origin: 'https://ihasolucioneslegales.com.co' } }, 403],
  ['wrong content type', { headers: { 'content-type': 'text/plain' } }, 415],
  ['free-form legal text', { body: { ...sample, prompt: 'Legal file' } }, 400],
  ['invalid scenario', { body: { ...sample, scenario: 'Legal file' } }, 400],
  ['mismatched model', { body: { ...sample, provider: 'anthropic' } }, 400],
  ['oversized body', { body: { ...sample, scenario: 'x'.repeat(2048) } }, 400],
  ['missing provider key', { config: { OPENAI_API_KEY: '' } }, 503],
]) {
  test(label + ' is blocked before any upstream call', async () => {
    const response = await run(options);
    assert.equal(response.status, status);
    assert.equal(response.calls.length, 0);
  });
}

test('fails closed if quota is exhausted, unavailable or malformed', async () => {
  for (const [quota, status] of [[false, 429], [null, 503], ['true', 503]]) {
    const response = await run({ quota });
    assert.equal(response.status, status);
    assert.equal(response.calls.length, 1);
  }
});

test('returns a generic error after provider rejection and does not retry', async () => {
  const response = await run({ providerFails: true });
  assert.equal(response.status, 502);
  assert.deepEqual(response.body, { error: 'provider_unavailable' });
  assert.equal(response.calls.length, 2);
});
