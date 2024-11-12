import type { APIRoute } from 'astro';
import getMods from '../lib/getMods';

export const GET: APIRoute = async () => {
    let mods = await getMods();
    return new Response(JSON.stringify(mods));
};
