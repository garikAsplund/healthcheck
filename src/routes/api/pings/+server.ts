import { json } from '@sveltejs/kit';
import { getRecentPings } from '$lib/server/db';

export async function GET() {
  const rows = await getRecentPings(1000);
  return json(rows);
}
