import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		authors: z.array(z.string()),
		links: z.array(z.tuple([z.string(), z.string().url()]))
	}),
});

const mods = defineCollection({
	type: 'data',
	schema: z.object({
		tags: z.enum(['gen-ai', 'content', 'dev', 'qol', 'lib', 'mature']).array().optional(),
		lastUpdate: z.string().datetime(),
		url: z.string().url(),
		source: z.string().url().optional(),
		sha256: z.string().length(64),
		icon: z.string().url().optional(),
	})
});

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		authors: z.array(z.string()),
		date: z.string().datetime(),
	})
});

export const collections = {
	projects,
	mods,
	blog,
};
