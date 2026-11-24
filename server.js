// Simple WebSocket Server for Real-Time Chat Testing
// Run with: node server.js

const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`===============================================`);
console.log(` WebSocket Chat Server is running on port ${PORT}`);
console.log(` ws://localhost:${PORT}`);
console.log(`===============================================`);

wss.on('connection', (ws) => {
  console.log('[+] A client connected');

  ws.on('message', (data) => {
    console.log('[Message Received]:', data.toString());

    // Broadcast message to all other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('[-] A client disconnected');
  });

  ws.on('error', (err) => {
    console.error('[Error]:', err.message);
  });
});
