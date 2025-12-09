
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, '../packages/mcp-server/dist/index.js');

const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'inherit']
});

// Tool call to get ALL components
const listRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
        name: 'search_components',
        arguments: {
            query: 'button', // Broad query to get something
            limit: 20
        }
    }
};

const initRequest = {
    jsonrpc: '2.0',
    id: 0,
    method: 'initialize',
    params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'real-client', version: '1.0' } }
};

server.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean);
    for (const line of lines) {
        try {
            const msg = JSON.parse(line);
            // Wait for init result then send request
            if (msg.id === 0) {
                server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
                server.stdin.write(JSON.stringify(listRequest) + '\n');
            }
            // Handle tool result
            else if (msg.id === 1) {
                // Output purely the result content for the user to see
                if (msg.result && msg.result.content && msg.result.content[0]) {
                    console.log(msg.result.content[0].text);
                } else {
                    console.log("No content returned");
                }
                process.exit(0);
            }
        } catch (e) { }
    }
});

server.stdin.write(JSON.stringify(initRequest) + '\n');
