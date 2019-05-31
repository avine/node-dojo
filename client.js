const net = require('net');

const socket = net.createConnection({
  host: 'localhost',
  port: 60300
}, () => {
  console.log('Connected');

  socket.write('world!\r\n');
});

socket.on('data', (data) => {
  console.log(data.toString());
  socket.end();
});

socket.on('end', () => {
  console.log('disconnected from server');
});

/*
setTimeout(() => {
  console.log('END');
  socket.end();
}, 2000);
*/