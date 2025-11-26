import { searchComponents, getComponentWithDependencies } from '../registry/search.js';
import { getComponentsByType } from '../registry/loader.js';
import type {
    SearchComponentsParamsSchema,
    GetComponentCodeParamsSchema,
    ListBlocksParamsSchema
} from '../registry/types.js';
import type { z } from 'zod';

/**
 * Search for components by query
 */
export async function handleSearchComponents(
    params: z.infer<typeof SearchComponentsParamsSchema>
) {
    const { query, type = 'all', limit = 10 } = params;

    const results = searchComponents(query, type, limit);

    return {
        content: [
            {
                type: 'text' as const,
                text: JSON.stringify(
                    {
                        query,
                        type,
                        resultsCount: results.length,
                        results: results.map((r) => ({
                            name: r.name,
                            type: r.type,
                            description: r.description,
                            category: r.category,
                            relevance: Math.round(r.score * 100) + '%'
                        }))
                    },
                    null,
                    2
                )
            }
        ]
    };
}

/**
 * Get component source code with dependencies
 */
export async function handleGetComponentCode(
    params: z.infer<typeof GetComponentCodeParamsSchema>
) {
    const { name, includeDependencies = true } = params;

    const { component, dependencies } = getComponentWithDependencies(name);

    if (!component) {
        return {
            content: [
                {
                    type: 'text' as const,
                    text: `Component "${name}" not found in registry.`
                }
            ]
        };
    }

    const response: any = {
        name,
        type: component.type,
        description: component.description,
        files: component.files,
        dependencies: component.dependencies || [],
        devDependencies: component.devDependencies || []
    };

    if (includeDependencies && Object.keys(dependencies).length > 0) {
        response.registryDependencies = Object.keys(dependencies);
        response.dependencyDetails = dependencies;
    }

    return {
        content: [
            {
                type: 'text' as const,
                text: JSON.stringify(response, null, 2)
            }
        ]
    };
}

/**
 * List all blocks, optionally filtered by category
 */
export async function handleListBlocks(params: z.infer<typeof ListBlocksParamsSchema>) {
    const { category } = params;

    const blocks = getComponentsByType('block');
    const blockArray = Object.entries(blocks).map(([name, block]) => ({
        name,
        description: block.description,
        category: block.category,
        subcategory: block.subcategory
    }));

    const filtered = category
        ? blockArray.filter(
            (b) => b.category?.toLowerCase().includes(category.toLowerCase())
        )
        : blockArray;

    return {
        content: [
            {
                type: 'text' as const,
                text: JSON.stringify(
                    {
                        totalBlocks: filtered.length,
                        category: category || 'all',
                        blocks: filtered
                    },
                    null,
                    2
                )
            }
        ]
    };
}

/**
 * Validate component usage (basic validation)
 */
export async function handleValidateComponent(params: { component: string; code: string }) {
    const { component, dependencies } = getComponentWithDependencies(params.component);

    if (!component) {
        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify({
                        valid: false,
                        error: `Component "${params.component}" not found`
                    })
                }
            ]
        };
    }

    // Basic validation - check if component name appears in code
    const isUsed = params.code.includes(component.name);

    const suggestions: string[] = [];
    if (!isUsed) {
        suggestions.push(`Import or use the ${component.name} component in your code`);
    }

    if (component.dependencies && component.dependencies.length > 0) {
        suggestions.push(
            `Ensure these dependencies are installed: ${component.dependencies.join(', ')}`
        );
    }

    return {
        content: [
            {
                type: 'text' as const,
                text: JSON.stringify(
                    {
                        valid: true,
                        component: component.name,
                        suggestions,
                        requiredDependencies: component.dependencies || [],
                        registryDependencies: Object.keys(dependencies)
                    },
                    null,
                    2
                )
            }
        ]
    };
}
