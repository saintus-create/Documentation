import { z } from 'zod';

// Registry schema matching docs/registry.json structure
export const RegistryItemSchema = z.object({
    name: z.string(),
    type: z.enum([
        'registry:ui',
        'registry:block',
        'registry:component',
        'registry:example',
        'registry:lib',
        'registry:style',
        'registry:hook',
        'registry:theme'
    ]),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(z.any()).optional(),
    tailwind: z.any().optional(),
    cssVars: z.any().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional()
});

export const RegistrySchema = z.record(z.string(), RegistryItemSchema);

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type Registry = z.infer<typeof RegistrySchema>;

// Component search result
export interface ComponentSearchResult {
    name: string;
    type: string;
    description?: string;
    category?: string;
    score: number;
}

// Tool parameter schemas
export const SearchComponentsParamsSchema = z.object({
    query: z.string().describe('Search query for components'),
    type: z
        .enum(['ui', 'block', 'example', 'lib', 'all'])
        .optional()
        .default('all')
        .describe('Filter by component type'),
    limit: z.number().optional().default(10).describe('Maximum number of results')
});

export const GetComponentCodeParamsSchema = z.object({
    name: z.string().describe('Component name'),
    includeDependencies: z
        .boolean()
        .optional()
        .default(true)
        .describe('Include registry dependencies')
});

export const ListBlocksParamsSchema = z.object({
    category: z
        .string()
        .optional()
        .describe('Filter blocks by category (dashboard, authentication, forms, etc.)')
});

export const GetThemeTokensParamsSchema = z.object({
    section: z
        .enum(['colors', 'spacing', 'typography', 'all'])
        .optional()
        .default('all')
        .describe('Theme section to retrieve')
});

export const ValidateComponentParamsSchema = z.object({
    component: z.string().describe('Component name to validate'),
    code: z.string().describe('User code to validate')
});

export const GenerateTemplateParamsSchema = z.object({
    name: z.string().describe('Component name'),
    type: z.enum(['ui', 'block', 'example']).describe('Component type'),
    dependencies: z.array(z.string()).optional().describe('Component dependencies')
});
