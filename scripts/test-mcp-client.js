
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, '../packages/mcp-server/dist/index.js');

console.log('Starting MCP server from:', serverPath);

const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'inherit']
});

const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
        name: 'search_components',
        arguments: {
            query: '',
            limit: 5,
            type: 'all'
        }
    }
};

// Also try to list blocks to get the "item functions"
const listBlocksRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
        name: 'list_blocks',
        arguments: {}
    }
};

// We need to perform the handshake first if using SDK, but raw JSON-RPC might work 
// or we might need to conform to MCP protocol more strictly.
// Since we are using stdio transport:
// 1. Send initialize request
// 2. Wait for response
// 3. Send tool call

const initRequest = {
    jsonrpc: '2.0',
    id: 0,
    method: 'initialize',
    params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
            name: 'test-client',
            version: '1.0.0'
        }
    }
};

server.stdout.on('data', (data) => {
    const messages = data.toString().split('\n').filter(Boolean);
    for (const msg of messages) {
        try {
            const response = JSON.parse(msg);
            console.log('Received response ID:', response.id);

            if (response.id === 0) {
                // Initialized, send initialized notification then tool call
                server.stdin.write(JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'notifications/initialized'
                }) + '\n');

                console.log('Sending search_components request...');
                server.stdin.write(JSON.stringify(request) + '\n');
            } else if (response.id === 1) {
                console.log('Search Results:', JSON.stringify(response.result, null, 2));
                process.exit(0);
            }
        } catch (e) {
            console.log('Raw output:', msg);
        }
    }
});

console.log('Sending initialize...');
server.stdin.write(JSON.stringify(initRequest) + '\n');
