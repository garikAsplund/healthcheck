import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/pings');
  const pings = await res.json();
  return { pings };
};
