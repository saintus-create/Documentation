
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, '../packages/mcp-server/dist/index.js');

const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'inherit']
});

const validateRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
        name: 'validate_component_usage',
        arguments: {
            component: 'card',
            code: `
        <script>
          import * as Card from "$lib/registry/ui/card";
        </script>

        <Card.Root>
          <Card.Header>
             <Card.Title>Blog Post</Card.Title>
             <Card.Description>Summary</Card.Description>
          </Card.Header>
          <Card.Content>
             Content...
          </Card.Content>
        </Card.Root>
      `
        }
    }
};

const initRequest = {
    jsonrpc: '2.0',
    id: 0,
    method: 'initialize',
    params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'validation-client', version: '1.0' } }
};

server.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean);
    for (const line of lines) {
        try {
            const msg = JSON.parse(line);
            if (msg.id === 0) {
                server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
                server.stdin.write(JSON.stringify(validateRequest) + '\n');
            }
            else if (msg.id === 1) {
                if (msg.result && msg.result.content && msg.result.content[0]) {
                    console.log(msg.result.content[0].text);
                }
                process.exit(0);
            }
        } catch (e) { }
    }
});

server.stdin.write(JSON.stringify(initRequest) + '\n');
