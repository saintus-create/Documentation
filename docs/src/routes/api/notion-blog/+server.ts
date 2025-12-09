import { json } from '@sveltejs/kit';
import { Client } from '@notionhq/client';
import type { RequestHandler } from './$types';

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_API_KEY
});

// Your Notion database ID (you'll set this after creating the database)
const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

export const GET: RequestHandler = async ({ url }) => {
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const cursor = url.searchParams.get('cursor') || undefined;

    if (!DATABASE_ID) {
        return json({
            error: 'NOTION_DATABASE_ID not configured',
            posts: [],
            setup_required: true
        });
    }

    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            page_size: limit,
            start_cursor: cursor,
            filter: {
                property: 'Status',
                select: {
                    equals: 'Published'
                }
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending'
                }
            ]
        });

        const posts = response.results.map((page: any) => {
            const props = page.properties;

            return {
                id: page.id,
                title: props.Title?.title?.[0]?.plain_text || 'Untitled',
                excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || '',
                date: props.Date?.date?.start || new Date().toISOString().split('T')[0],
                category: props.Category?.select?.name || 'Uncategorized',
                slug: props.Slug?.rich_text?.[0]?.plain_text || page.id,
                authors: props.Authors?.multi_select?.map((author: any) => ({
                    name: author.name,
                    initials: author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                })) || [{ name: 'Anonymous', initials: 'AN' }],
                coverImage: props.Cover?.files?.[0]?.file?.url || props.Cover?.files?.[0]?.external?.url || null,
                notionUrl: page.url
            };
        });

        return json({
            posts,
            has_more: response.has_more,
            next_cursor: response.next_cursor
        });

    } catch (error: any) {
        console.error('Notion API Error:', error);
        return json({
            error: error.message,
            posts: []
        }, { status: 500 });
    }
};
