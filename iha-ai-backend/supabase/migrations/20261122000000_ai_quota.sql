begin;

create schema iha_ai_private;
revoke all on schema iha_ai_private from public, anon, authenticated;
grant usage on schema iha_ai_private to service_role;

create table iha_ai_private.daily_quota (
  quota_day date primary key,
  total integer not null,
  caller_counts jsonb not null
);
alter table iha_ai_private.daily_quota enable row level security;
revoke all on iha_ai_private.daily_quota from public, anon, authenticated;
grant select, insert, update, delete on iha_ai_private.daily_quota to service_role;

create function public.iha_ai_reserve_quota(caller_hash text)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  today date := (statement_timestamp() at time zone 'UTC')::date;
  admitted boolean;
begin
  if caller_hash is null or caller_hash !~ '^[0-9a-f]{64}$' then
    return false;
  end if;

  -- The conflicting day row serializes admissions across all function instances.
  insert into iha_ai_private.daily_quota as quota (quota_day, total, caller_counts)
  values (today, 1, jsonb_build_object(caller_hash, 1))
  on conflict (quota_day) do update
  set total = quota.total + 1,
      caller_counts = jsonb_set(quota.caller_counts, array[caller_hash],
        to_jsonb(coalesce((quota.caller_counts ->> caller_hash)::integer, 0) + 1))
  where quota.total < 100
    and coalesce((quota.caller_counts ->> caller_hash)::integer, 0) < 10
  returning true into admitted;

  delete from iha_ai_private.daily_quota where quota_day < today - 1;
  return coalesce(admitted, false);
end;
$$;

revoke all on function public.iha_ai_reserve_quota(text) from public, anon, authenticated;
grant execute on function public.iha_ai_reserve_quota(text) to service_role;

commit;
