# @shadcn-svelte/mcp-server

Model Context Protocol server for [shadcn-svelte](https://shadcn-svelte.com) component library.

## Features

- 🔍 **Component Search** - Fuzzy search across all shadcn-svelte components
- 📦 **Component Code** - Retrieve source code with dependencies
- 🏗️ **Blocks** - Access complete UI blocks (dashboards, forms, etc.)
- ✅ **Validation** - Validate component usage and get suggestions
- 🚀 **Local-first** - Direct access to monorepo registry (no API calls)
- ⚡ **Fast** - Smart caching for instant responses

## Installation

### Development (within monore)

From the monorepo root:

```bash
pnpm install
pnpm build:cli  # Build all packages
```

Then run the MCP server:

```bash
node packages/mcp-server/dist/index.js
```

### Published Package (future)

```bash
npx @shadcn-svelte/mcp-server
```

## Configuration

Add to your MCP-compatible editor's configuration:

### VS Code / Continue.dev

`.continue/config.json`:

```json
{
  "mcpServers": {
    "shadcn-svelte-local": {
      "command": "node",
      "args": [
        "/absolute/path/to/shadcn-svelte/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

### Cursor

Settings → AI → Model Context Protocol:

```json
{
  "shadcn-svelte-local": {
    "command": "node",
    "args": [
      "/absolute/path/to/shadcn-svelte/packages/mcp-server/dist/index.js"
    ]
  }
}
```

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

```json
{
  "mcpServers": {
    "shadcn-svelte-local": {
      "command": "node",
      "args": [
        "/Users/your-username/path/to/shadcn-svelte/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

## Available Tools

### search_components

Search for components by query with fuzzy matching.

**Parameters:**
- `query` (string, required): Search query
- `type` (string, optional): Filter by type (`ui`, `block`, `example`, `lib`, `all`)
- `limit` (number, optional): Max results (default: 10)

**Example:**
```
AI Prompt: "Search for form input components"
→ Uses: search_components({ query: "form input", type: "ui", limit: 5 })
```

### get_component_code

Get source code and metadata for a specific component.

**Parameters:**
- `name` (string, required): Component name
- `includeDependencies` (boolean, optional): Include registry deps (default: true)

**Example:**
```
AI Prompt: "Show me the button component code"
→ Uses: get_component_code({ name: "button", includeDependencies: true })
```

### list_blocks

List all available blocks, optionally filtered by category.

**Parameters:**
- `category` (string, optional): Category filter

**Example:**
```
AI Prompt: "List dashboard blocks"
→ Uses: list_blocks({ category: "dashboard" })
```

### validate_component_usage

Validate component usage in user code.

**Parameters:**
- `component` (string, required): Component name
- `code` (string, required): Code snippet to validate

**Example:**
```
AI Prompt: "Validate my Button usage: <Button variant='ghost'>Click</Button>"
→ Uses: validate_component_usage({ component: "button", code: "..." })
```

## Development

```bash
# Watch mode
pnpm dev

# Build
pnpm build

# Type check
pnpm check
```

## Architecture

```
src/
├── index.ts           # MCP server entry point
├── registry/
│   ├── types.ts       # Type definitions & Zod schemas
│   ├── loader.ts      # Registry JSON loader with caching
│   └── search.ts      # Fuzzy search & dependency resolution
└── tools/
    └── index.ts       # MCP tool implementations
```

## License

MIT
