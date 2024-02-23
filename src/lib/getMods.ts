import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

export type Mod = {
	folder: string;

	id: string;
	name: string;
	authors: string[];
	description: string;
	version: string;
};

export default function getMods(): Mod[] {
	const folders = readdirSync('mods');

	const mods: Mod[] = [];

	for (const folder of folders) {
		const confPath = path.join('mods', folder, 'mod.json');
		const conf = JSON.parse(readFileSync(confPath, 'utf8'));

		mods.push({
			folder,

			id: conf.id,
			name: conf.name,
			authors: conf.authors,
			description: conf.description,
			version: conf.version
		});
	}

	return mods;
}
