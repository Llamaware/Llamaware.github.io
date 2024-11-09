// imports
import type { APIRoute } from 'astro';
import getMods from '../lib/getMods';

// api route to get the repo json
export const GET: APIRoute = async () => {
    let mods = await getMods();
    return new Response(JSON.stringify(mods));
};
