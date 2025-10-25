import { createClient, type Client } from '@libsql/client';
import { env } from '$env/dynamic/private';

let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    if (!env.TURSO_DATABASE_URL) throw new Error('TURSO_DATABASE_URL is not set');
    // TURSO_AUTH_TOKEN may be optional for local dev if using local libsql
    client = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN
    });
  }
  return client;
}

export async function ensureSchema() {
  const db = getClient();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS pings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
      url TEXT NOT NULL,
      status INTEGER NOT NULL,
      ok INTEGER NOT NULL,
      response_ms INTEGER NOT NULL,
      error TEXT
    )
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_pings_created_at
    ON pings(created_at)
  `);
}

export type PingRecord = {
  id?: number;
  created_at?: string;
  url: string;
  status: number;
  ok: boolean;
  response_ms: number;
  error?: string | null;
};

export async function insertPing(rec: PingRecord) {
  const db = getClient();
  await db.execute({
    sql: `INSERT INTO pings (url, status, ok, response_ms, error) VALUES (?, ?, ?, ?, ?)` ,
    args: [rec.url, rec.status, rec.ok ? 1 : 0, rec.response_ms, rec.error ?? null]
  });
}

export async function pruneOldPings(days = 14) {
  const db = getClient();
  await db.execute({
    sql: `DELETE FROM pings WHERE datetime(created_at) < datetime('now', ?)`,
    args: [`-${days} days`]
  });
}

export async function getRecentPings(limit = 500) {
  const db = getClient();
  const res = await db.execute({
    sql: `SELECT id, created_at, url, status, ok, response_ms, error
          FROM pings
          WHERE datetime(created_at) >= datetime('now', '-14 days')
          ORDER BY datetime(created_at) DESC
          LIMIT ?`,
    args: [limit]
  });
  return res.rows as unknown as Array<Required<PingRecord>>;
}
