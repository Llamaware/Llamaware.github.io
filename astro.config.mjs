import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
	site: 'https://llamawa.re',
	server: {
		port: 3000,
	},
	compressHTML: false,
	integrations: [solidJs()],
	experimental: {
		contentCollectionCache: true
	}
});
