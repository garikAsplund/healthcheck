import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('/api/pings');
    const pings = await res.json();
    
    // Ensure it's an array
    return { 
      pings: Array.isArray(pings) ? pings : [] 
    };
  } catch (error) {
    console.error('Load error:', error);
    return { pings: [] };
  }
};