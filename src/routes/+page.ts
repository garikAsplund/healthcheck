import type { PageLoad } from './$types';

console.log(`App started at ${new Date().toISOString()}`);

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/pings');
  const pings = await res.json();
  return { pings };
};
