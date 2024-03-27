import type { APIRoute } from 'astro';

import JSZip from 'jszip';
import cache from '../../lib/cache';
import getMod from '../../lib/getMod';
import getMods from '../../lib/getMods';

export const GET: APIRoute = async ({ props }) => {
	const mod = await getMod(props.id);

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
	const mods = await getMods();

	return mods.map(mod => ({
		params: { id: mod.modJson.id },
		props: { id: mod.data.id }
	}));
}
