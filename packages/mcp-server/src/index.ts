#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

import {
    SearchComponentsParamsSchema,
    GetComponentCodeParamsSchema,
    ListBlocksParamsSchema,
    ValidateComponentParamsSchema
} from './registry/types.js';

import {
    handleSearchComponents,
    handleGetComponentCode,
    handleListBlocks,
    handleValidateComponent
} from './tools/index.js';

// Create MCP server
const server = new Server(
    {
        name: 'shadcn-svelte-mcp',
        version: '0.1.0'
    },
    {
        capabilities: {
            tools: {}
        }
    }
);

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'search_components',
                description:
                    'Search for shadcn-svelte components by query. Supports fuzzy matching on component name, description, category, and dependencies.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Search query (e.g., "dropdown menu", "form input")'
                        },
                        type: {
                            type: 'string',
                            enum: ['ui', 'block', 'example', 'lib', 'all'],
                            default: 'all',
                            description: 'Filter by component type'
                        },
                        limit: {
                            type: 'number',
                            default: 10,
                            description: 'Maximum number of results to return'
                        }
                    },
                    required: ['query']
                }
            },
            {
                name: 'get_component_code',
                description:
                    'Get source code and metadata for a specific shadcn-svelte component, including its registry dependencies.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Component name (e.g., "button", "card", "dialog")'
                        },
                        includeDependencies: {
                            type: 'boolean',
                            default: true,
                            description:
                                'Include registry dependencies in the response'
                        }
                    },
                    required: ['name']
                }
            },
            {
                name: 'list_blocks',
                description:
                    'List all available shadcn-svelte blocks (complete UI sections like dashboards, forms, authentication).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        category: {
                            type: 'string',
                            description:
                                'Optional category filter (e.g., "dashboard", "authentication", "forms")'
                        }
                    }
                }
            },
            {
                name: 'validate_component_usage',
                description:
                    'Validate component usage and get suggestions for proper implementation.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        component: {
                            type: 'string',
                            description: 'Component name to validate'
                        },
                        code: {
                            type: 'string',
                            description: 'User code snippet to validate'
                        }
                    },
                    required: ['component', 'code']
                }
            }
        ]
    };
});

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case 'search_components': {
                const params = SearchComponentsParamsSchema.parse(args);
                return await handleSearchComponents(params);
            }
            case 'get_component_code': {
                const params = GetComponentCodeParamsSchema.parse(args);
                return await handleGetComponentCode(params);
            }
            case 'list_blocks': {
                const params = ListBlocksParamsSchema.parse(args);
                return await handleListBlocks(params);
            }
            case 'validate_component_usage': {
                const params = ValidateComponentParamsSchema.parse(args);
                return await handleValidateComponent(params);
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify({ error: errorMessage }, null, 2)
                }
            ],
            isError: true
        };
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('shadcn-svelte MCP server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
