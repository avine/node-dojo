const http = require('http');
const crypto = require('crypto');

// Create an HTTP server
const srv = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
srv.on('upgrade', (req, socket, head) => {

  let data = req.headers['sec-websocket-key'];

  const generator = crypto.createHash('sha1');
  generator.update(Buffer.from(data + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'));
  const swa = generator.digest('base64');

  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n');

  socket.pipe(socket); // echo back
});

// Now that server is running
srv.listen(1337, '127.0.0.1', () => {
  console.log('Running...');
  /*// make a request
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, socket, upgradeHead) => {
    console.log('got upgraded!');
    // socket.end();
    // process.exit(0);
  });*/
});
