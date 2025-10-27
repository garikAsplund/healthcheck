// In your API route
import { json } from '@sveltejs/kit';
import { getRecentPings } from '$lib/server/db';

export async function GET() {
  try {
    const rows = await getRecentPings(1000);
    console.log('getRecentPings returned:', typeof rows, Array.isArray(rows), rows?.length);
    
    // Ensure it's an array
    const pings = Array.isArray(rows) ? rows : [];
    return json(pings);
  } catch (error) {
    console.error('API error:', error);
    return json([]);
  }
}