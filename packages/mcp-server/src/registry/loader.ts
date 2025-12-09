import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Registry, RegistrySchema, RegistryItemSchema } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let cachedRegistry: Registry | null = null;

/**
 * Load the shadcn-svelte registry from docs/registry.json
 */
export function loadRegistry(): Registry {
    if (cachedRegistry) {
        return cachedRegistry;
    }

    try {
        // Navigate to docs/registry.json
        // Try multiple paths to handle both src (dev) and dist (prod) environments
        const candidates = [
            join(__dirname, '../../../../docs/registry.json'), // From src/registry/loader.ts
            join(__dirname, '../../../docs/registry.json'),    // From dist/index.js
            join(process.cwd(), 'docs/registry.json')          // From project root
        ];

        let registryPath = '';

        for (const candidate of candidates) {
            if (existsSync(candidate)) {
                registryPath = candidate;
                break;
            }
        }

        if (!registryPath) {
            throw new Error(`Registry file not found. Checked: ${candidates.join(', ')}`);
        }

        const content = readFileSync(registryPath, 'utf-8');
        const rawData = JSON.parse(content);

        // Transform items array to record
        const registry: Registry = {};
        if (Array.isArray(rawData.items)) {
            for (const item of rawData.items) {
                const parsedItem = RegistryItemSchema.parse(item);
                registry[parsedItem.name] = parsedItem;
            }
        }

        cachedRegistry = registry;
        return cachedRegistry;
    } catch (error) {
        console.error('Failed to load registry:', error);
        throw new Error('Could not load shadcn-svelte registry');
    }
}

/**
 * Get a specific component from the registry
 */
export function getComponent(name: string): ReturnType<typeof loadRegistry>[string] | null {
    const registry = loadRegistry();
    return registry[name] || null;
}

/**
 * Get all components of a specific type
 */
export function getComponentsByType(type: string): ReturnType<typeof loadRegistry> {
    const registry = loadRegistry();
    const filtered: Registry = {};

    for (const [name, component] of Object.entries(registry)) {
        if (type === 'all' || component.type === `registry:${type}`) {
            filtered[name] = component;
        }
    }

    return filtered;
}

/**
 * Clear the registry cache (useful for testing or hot reload)
 */
export function clearCache(): void {
    cachedRegistry = null;
}
