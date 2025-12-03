import Fuse from 'fuse.js';
import { loadRegistry } from './loader.js';
import type { ComponentSearchResult } from './types.js';

/**
 * Search components using fuzzy matching on name, description, and dependencies
 */
export function searchComponents(
    query: string,
    type: string = 'all',
    limit: number = 10
): ComponentSearchResult[] {
    const registry = loadRegistry();

    // Filter by type first
    const components =
        type === 'all'
            ? Object.entries(registry)
            : Object.entries(registry).filter(([, comp]) => comp.type === `registry:${type}`);

    // Prepare searchable items
    const searchData = components.map(([name, component]) => ({
        name,
        type: component.type,
        description: component.description || '',
        category: component.category || '',
        subcategory: component.subcategory || '',
        dependencies: (component.dependencies || []).join(' '),
        registryDependencies: (component.registryDependencies || []).join(' ')
    }));

    // Configure Fuse.js for fuzzy search
    const fuse = new Fuse(searchData, {
        keys: [
            { name: 'name', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'category', weight: 1 },
            { name: 'subcategory', weight: 0.8 },
            { name: 'dependencies', weight: 0.5 },
            { name: 'registryDependencies', weight: 0.5 }
        ],
        threshold: 0.4,
        includeScore: true
    });

    // Perform search
    const results = fuse.search(query);

    // Format and limit results
    return results.slice(0, limit).map((result) => ({
        name: result.item.name,
        type: result.item.type,
        description: result.item.description,
        category: result.item.category,
        score: 1 - (result.score || 0) // Invert score so higher is better
    }));
}

/**
 * Get component with all its registry dependencies recursively
 */
export function getComponentWithDependencies(name: string): {
    component: ReturnType<typeof loadRegistry>[string] | null;
    dependencies: Record<string, ReturnType<typeof loadRegistry>[string]>;
} {
    const registry = loadRegistry();
    const component = registry[name];

    if (!component) {
        return { component: null, dependencies: {} };
    }

    const dependencies: Record<string, ReturnType<typeof loadRegistry>[string]> = {};
    const visited = new Set<string>();

    function collectDependencies(compName: string) {
        if (visited.has(compName)) return;
        visited.add(compName);

        const comp = registry[compName];
        if (!comp) return;

        const regDeps = comp.registryDependencies || [];
        for (const dep of regDeps) {
            if (!visited.has(dep)) {
                dependencies[dep] = registry[dep];
                collectDependencies(dep);
            }
        }
    }

    collectDependencies(name);

    return { component, dependencies };
}
