import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

import generateRepoJson from './src/lib/getRepo';

// https://astro.build/config
export default defineConfig({
	site: 'https://llamawa.re',
	server: {
		port: 3000
	},
	compressHTML: false,
	integrations: [
		solidJs(), 
		mdx(),
		{
			name: 'startup-tasks',
			hooks: {
				'astro:server:setup': async () => {
					await generateRepoJson();
				}
			}
		}
	],
	experimental: {
		contentCollectionCache: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'vesper'
		}
	}
});
