import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://llamawa.re',
	server: {
		port: 3000,
	},
	compressHTML: false,
	integrations: [solidJs(), mdx()],
	experimental: {
		contentCollectionCache: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'vesper'
		}
	}
});
