
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, '../packages/mcp-server/dist/index.js');

const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'inherit']
});

const req = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
        name: 'get_component_code',
        arguments: { name: 'card' }
    }
};

const init = {
    jsonrpc: '2.0', id: 0, method: 'initialize',
    params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'client', version: '1.0' } }
};

server.stdout.on('data', (d) => {
    const lines = d.toString().split('\n').filter(Boolean);
    for (const l of lines) {
        try {
            const m = JSON.parse(l);
            if (m.id === 0) {
                server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
                server.stdin.write(JSON.stringify(req) + '\n');
            } else if (m.id === 1) {
                // Output the official code usage for Card
                if (m.result && m.result.content) {
                    console.log(m.result.content[0].text);
                }
                process.exit(0);
            }
        } catch (e) { }
    }
});
server.stdin.write(JSON.stringify(init) + '\n');
