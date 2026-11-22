import { createHash, timingSafeEqual } from 'node:crypto';

const models = new Map([
  ['openai', new Set(['gpt-4.1-mini', 'gpt-4.1-nano'])],
  ['anthropic', new Set(['claude-haiku-4-5-20251001', 'claude-haiku-5-5'])],
]);

const scenarios = new Map([
  ['refund', 'Una persona ficticia consulta qué documentos puede organizar antes de pedir un reembolso por una compra en línea en Colombia.'],
  ['platform', 'Una persona ficticia consulta cómo organizar una cronología tras la cancelación de una reserva por una plataforma digital.'],
]);

const instruction = 'Responde en español con orientación general, breve y no vinculante. No inventes normas, plazos ni citas. Sugiere verificar con un profesional cuando corresponda.';
const digest = (value) => createHash('sha256').update(value).digest();
const maxBodyBytes = 1024;
const maxOutputTokens = 300;

async function readInput(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const bytes = Buffer.from(chunk);
    size += bytes.length;
    if (size > maxBodyBytes) return null;
    chunks.push(bytes);
  }
  const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  if (Object.keys(input).length !== 3 ||
      !models.get(input.provider)?.has(input.model) ||
      !scenarios.has(input.scenario)) return null;
  return input;
}

async function requestJson(fetcher, url, headers, body, timeout) {
  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeout),
    redirect: 'error',
  });
  if (!response.ok) throw new Error('Upstream request failed');
  return response.json();
}

async function generate(fetcher, env, input) {
  const prompt = scenarios.get(input.scenario);
  if (input.provider === 'openai') {
    const result = await requestJson(fetcher, 'https://api.openai.com/v1/chat/completions',
      { authorization: 'Bearer ' + env.OPENAI_API_KEY }, {
        model: input.model,
        messages: [{ role: 'system', content: instruction }, { role: 'user', content: prompt }],
        max_completion_tokens: maxOutputTokens,
        store: false,
      }, 12000);
    return result.choices?.[0]?.message?.content;
  }
  const result = await requestJson(fetcher, 'https://api.anthropic.com/v1/messages',
    { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, {
      model: input.model,
      system: instruction,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxOutputTokens,
    }, 12000);
  return result.content?.filter((block) => block.type === 'text').map((block) => block.text).join('\n');
}

export function makeHandler(env, fetcher = fetch) {
  return async function handler(req, res) {
    const send = (status, body) => {
      res.statusCode = status;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.setHeader('cache-control', 'no-store');
      res.setHeader('x-content-type-options', 'nosniff');
      res.end(JSON.stringify(body));
    };

    if (env.VERCEL_ENV !== 'preview') return send(404, { error: 'not_found' });
    if (req.method !== 'POST') {
      res.setHeader('allow', 'POST');
      return send(405, { error: 'method_not_allowed' });
    }

    // One random, revocable token per tester, visible only to authorized server-side callers.
    const tokens = (env.IHA_AI_ACCESS_TOKENS || '').split(',');
    if (!tokens.every((token) => /^[0-9a-f]{64}$/.test(token))) {
      return send(503, { error: 'unavailable' });
    }
    const match = /^Bearer ([0-9a-f]{64})$/.exec(req.headers.authorization || '');
    const caller = match && digest(match[1]);
    if (!caller || tokens.reduce((matched, token) => Number(timingSafeEqual(digest(token), caller)) | matched, 0) === 0) {
      return send(401, { error: 'unauthorized' });
    }
    if (req.headers.origin) return send(403, { error: 'browser_origin_not_allowed' });
    if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) {
      return send(415, { error: 'json_required' });
    }
    if (Number(req.headers['content-length']) > maxBodyBytes) {
      return send(413, { error: 'body_too_large' });
    }

    let input;
    try {
      input = await readInput(req);
    } catch {
      return send(400, { error: 'invalid_request' });
    }
    if (!input) return send(400, { error: 'invalid_request' });

    const url = env.IHA_QUOTA_SUPABASE_URL;
    const secret = env.IHA_QUOTA_SUPABASE_SECRET_KEY;
    const providerKey = input.provider === 'openai' ? env.OPENAI_API_KEY : env.ANTHROPIC_API_KEY;
    if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url || '') ||
        !secret?.startsWith('sb_secret_') || !providerKey) {
      return send(503, { error: 'unavailable' });
    }

    let allowed;
    try {
      allowed = await requestJson(fetcher, url + '/rest/v1/rpc/iha_ai_reserve_quota',
        { apikey: secret }, { caller_hash: caller.toString('hex') }, 2500);
    } catch {
      return send(503, { error: 'quota_unavailable' });
    }
    if (allowed === false) return send(429, { error: 'daily_quota_exceeded' });
    if (allowed !== true) return send(503, { error: 'quota_unavailable' });

    try {
      const text = await generate(fetcher, env, input);
      if (typeof text !== 'string' || !text.trim()) throw new Error('Invalid upstream response');
      return send(200, { provider: input.provider, model: input.model, text });
    } catch {
      return send(502, { error: 'provider_unavailable' });
    }
  };
}

export default function handler(req, res) {
  return makeHandler(process.env)(req, res);
}
