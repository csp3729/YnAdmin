const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 3729 });

wss.on('connection', (ws) => {
  console.log('connection');
  ws.on('message', (msg) => {
    console.log('received: %s', msg);
  });
  ws.send('something');
});
