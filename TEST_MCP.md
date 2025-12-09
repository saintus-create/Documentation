# Testing the shadcn-svelte MCP Server

## Quick Test Queries

Try asking me (or any AI assistant with MCP configured) these questions:

### Component Discovery
```
List all available shadcn-svelte components
```

### Get Component Documentation
```
Show me the Button component documentation from shadcn-svelte
```

### Search for Components
```
Search for date picker components in shadcn-svelte
```

### Icon Search
```
Find all user-related icons in Lucide Svelte
```

### Installation Help
```
How do I install the Dialog component using pnpm?
```

### Theming
```
How do I set up custom theming in shadcn-svelte?
```

## Expected Behavior

When the MCP server is properly configured, I should be able to:

1. **List Components**: Retrieve a complete list of all available components
2. **Get Documentation**: Fetch detailed docs with installation steps, props, and examples
3. **Search**: Find components by keyword with fuzzy matching
4. **Icon Lookup**: Browse 1400+ Lucide Svelte icons
5. **Guides**: Access installation, theming, and CLI usage guides

## Troubleshooting

If the MCP server doesn't respond:

1. **Check Configuration**: Ensure `.mcp.json` is in the workspace root
2. **Restart Editor**: MCP servers often need an editor restart to load
3. **Try Backup**: Switch to Railway deployment if Mastra Cloud is down
4. **Test Manually**: Use `npx mcp-remote https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/mcp`

## Manual Testing (Command Line)

You can test the MCP server directly from terminal:

```bash
# Install mcp-remote if needed
npm install -g @modelcontextprotocol/sdk

# Test the server
npx mcp-remote https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/mcp
```

## Next Steps

1. Try the test queries above
2. Explore the available tools
3. Use it to build your shadcn-svelte components
4. Check `MCP_SETUP.md` for detailed configuration

---

**Note**: The MCP server provides **Svelte** component documentation, not React!
