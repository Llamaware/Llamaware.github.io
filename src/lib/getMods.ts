import type { ModData } from './getMod';

import { getCollection } from 'astro:content';
import getMod from './getMod';

export type Mod = {
	folder: string;

	id: string;
	name: string;
	authors: string[];
	description: string;
	version: string;
};

export default async function getMods(): Promise<ModData[]> {
	const mods = await getCollection('mods');

	return await Promise.all(mods.map(mod => getMod(mod.id)));
}
