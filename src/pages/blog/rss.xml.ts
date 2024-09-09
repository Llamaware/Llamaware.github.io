import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: { site: string; }) {
	const blog = await getCollection('blog');

	return rss({
		title: 'Llamaware Blog',
		description: 'Wicked soliloquies from the techno-dome.',
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: new Date(post.data.date),
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
			}),
			link: `/blog/${post.slug}`,
		})),
	});
}
