import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		authors: z.array(z.string()),
		links: z.array(z.tuple([z.string(), z.string().url()]))
	}),
});

export const collections = {
	projects
};
