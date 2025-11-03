import { ensureSchema, insertPing, pruneOldPings } from './db';

export async function runPing() {
  const url = process.env.HEALTHCHECK_URL;
  if (!url) {
    console.warn('HEALTHCHECK_URL not set; skipping ping');
    return;
  }

  await ensureSchema();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  const started = performance.now();
  let status = 0;
  let ok = false;
  let error: string | null = null;

  try {
    const res = await fetch(url, { method: 'GET', signal: controller.signal });
    status = res.status;
    ok = res.ok;
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  } finally {
    clearTimeout(timeout);
  }

  const response_ms = Math.max(1, Math.round(performance.now() - started));
  await insertPing({ url, status, ok, response_ms, error });
  await pruneOldPings(14);
}
