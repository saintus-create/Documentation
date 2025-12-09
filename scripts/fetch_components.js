
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, '../packages/mcp-server/dist/index.js');

const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'inherit']
});

const requests = [
    // 1. Get Card code
    {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: {
            name: 'get_component_code',
            arguments: { name: 'card', includeDependencies: true }
        }
    },
    // 2. Get Avatar code
    {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
            name: 'get_component_code',
            arguments: { name: 'avatar', includeDependencies: true }
        }
    },
    // 3. Get Button code
    {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
            name: 'get_component_code',
            arguments: { name: 'button', includeDependencies: true }
        }
    },
    // 4. Get Badge code
    {
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: {
            name: 'get_component_code',
            arguments: { name: 'badge', includeDependencies: true }
        }
    }
];

const initRequest = {
    jsonrpc: '2.0',
    id: 0,
    method: 'initialize',
    params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'builder-client', version: '1.0' } }
};

let currentReqIndex = 0;

server.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean);
    for (const line of lines) {
        try {
            const msg = JSON.parse(line);

            if (msg.id === 0) {
                // Init done, send first tool call
                server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
                server.stdin.write(JSON.stringify(requests[0]) + '\n');
            }
            else if (msg.id && msg.id > 0) {
                // Print result
                if (msg.result && msg.result.content && msg.result.content[0]) {
                    console.log(`\n--- RESULT FOR ID ${msg.id} ---`);
                    console.log(msg.result.content[0].text);
                }

                // Send next request
                currentReqIndex++;
                if (currentReqIndex < requests.length) {
                    server.stdin.write(JSON.stringify(requests[currentReqIndex]) + '\n');
                } else {
                    console.log("All requests done.");
                    process.exit(0);
                }
            }
        } catch (e) { }
    }
});

server.stdin.write(JSON.stringify(initRequest) + '\n');
