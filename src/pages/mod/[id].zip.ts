import type { APIRoute } from 'astro';

import path from 'node:path';
import { readFileSync, statSync } from 'node:fs';
import { glob } from 'glob';
import JSZip from 'jszip';
import getMods from '../../lib/getMods';

export const GET: APIRoute = async ({ props }) => {
	const modFolder = `./mods/${props.folder}`;

	const entriesRaw = await glob(`**`, {
		cwd: modFolder,
	});
	const entries = entriesRaw.filter(e => e !== '.');

	const zip = new JSZip();

	for (const entry of entries) {
		const entryPath = path.join(modFolder, entry);
		const stat = statSync(entryPath);

		if (stat.isDirectory()) zip.folder(entry)
		else if (stat.isFile()) zip.file(entry, readFileSync(entryPath));
		else throw new Error(`"${entryPath}" is neither a folder nor a path.`);
	}

	const data = await zip.generateAsync({
		type: 'arraybuffer',
		compression: 'DEFLATE',
		compressionOptions: {
			level: 9
		}
	});

	return new Response(data);
};

export function getStaticPaths() {
	return getMods().map(mod => ({
		params: { id: mod.id },
		props: { folder: mod.folder }
	}));
}
