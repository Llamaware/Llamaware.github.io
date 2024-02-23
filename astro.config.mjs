import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://llamawa.re',
	server: { port: 3000 },
	compressHTML: false
});
