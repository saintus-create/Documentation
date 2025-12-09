import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs';
import path from 'path';

// Reading from the local file system to simulate MCP data access

export const GET: RequestHandler = async ({ url }) => {
    const type = url.searchParams.get('type') ?? 'all';

    try {
        // When running 'pnpm dev' in the docs folder, registry.json is in the current directory
        // or one level up if we consider the workspace root.
        // Let's check both to be safe.
        let registryPath = path.resolve('registry.json');

        if (!fs.existsSync(registryPath)) {
            // Try looking in the parent/docs if running from root
            registryPath = path.resolve('docs/registry.json');
        }

        if (!fs.existsSync(registryPath)) {
            throw new Error('Registry file not found at ' + registryPath + ' or ./registry.json');
        }

        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        // Filter items if specific type requested (though 'all' is common)
        // Similar to the MCP handleListComponents logic
        const items = registry.items.map((item: any) => ({
            name: item.name,
            type: item.type.replace('registry:', ''),
            description: `A ${item.name} component from the shadcn-svelte registry.`,
            url: `/docs/components/${item.name}`,
            author: {
                name: 'shadcn',
                avatar: 'https://github.com/shadcn.png'
            }
        }));

        return json({ components: items });

    } catch (error) {
        console.error('Local Registry Read Error:', error);
        // Fallback to minimal data if file read fails (shouldn't happen in verified env)
        return json({ components: [] });
    }
};
