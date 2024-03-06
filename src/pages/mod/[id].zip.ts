import type { APIRoute } from 'astro';
import type { ModKey } from '../../lib/getMod';

import { getCollection } from 'astro:content';
import JSZip from 'jszip';
import getMod from '../../lib/getMod';
import cache from '../../lib/cache';

export const GET: APIRoute = async ({ params }) => {
	const mod = await getMod(params.id as ModKey);

	const origZipData = await cache.url(mod.data.url, mod.data.sha256);
	const zip = await JSZip.loadAsync(origZipData);

	const data = await zip.generateAsync({
		type: 'arraybuffer',
		compression: 'DEFLATE',
		compressionOptions: {
			level: 9
		}
	});

	return new Response(data);
};

export async function getStaticPaths() {
	const collection = await getCollection('mods');

	return collection.map(mod => ({
		params: { id: mod.id }
	}));
}
