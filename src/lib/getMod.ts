import type { DataEntryMap, InferEntrySchema } from 'astro:content';

import { getEntry } from 'astro:content';
import JSZip from 'jszip';
import cache from './cache';

export type ModKey = keyof DataEntryMap['mods'];
type ModSchema = InferEntrySchema<'mods'>;

type ModJSON = {
	id: string;
	name: string;
	authors: string[];
	description: string;
	version: string;
};

export type ModData = {
	data: ModSchema & { id: ModKey; };
	modJson: ModJSON;
};

export default async function getMod(modId: ModKey): Promise<ModData> {
	const mod = await getEntry('mods', modId);

	const origZipData = await cache.url(mod.data.url, mod.data.sha256);
	const origZip = await JSZip.loadAsync(origZipData);

	const modJsonData = origZip.file('mod.json');
	if (!modJsonData) throw new Error(`Failed to read mod.json from ${modId}`);
	const modJson: ModJSON = JSON.parse(await modJsonData.async('text'));

	return {
		data: {
			...mod.data,
			id: modId
		},
		modJson,
	};
}
