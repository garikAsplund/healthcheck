import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { runPing } from '$lib/server/ping';

declare global {
  // eslint-disable-next-line no-var
  var __healthcheck_started: boolean | undefined;
}

function startSchedulerOnce() {
  if (globalThis.__healthcheck_started) return;
  globalThis.__healthcheck_started = true;

  const intervalMs = Number(env.PING_INTERVAL_MS ?? '3600000'); // default: 1 hour
  // kick off an immediate ping, then schedule
  runPing().catch((e) => console.error('ping error', e));
  setInterval(() => runPing().catch((e) => console.error('ping error', e)), intervalMs);
}

export const handle: Handle = async ({ event, resolve }) => {
  startSchedulerOnce();
  return resolve(event);
};
