const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
  throw Error('Error: No filename specified.');
}

const stack = [];

let i = 0;

const watcher = fs.watch(filename, () => {
  console.log('File changed...');
  stack.forEach(connection => {
    connection.write(`File changed: ${i++}\n`);
  });
});

const server = net.createServer(socket => {
  console.log('Subscriber connected.');
  socket.write(`Now watching "${filename}" for changes...\n`);

  stack.push(socket);

  socket.on('close', () => {
    console.log('Subscriber disconnected.');
    stack.splice(stack.indexOf(socket), 1);
    if (!stack.length) {
      watcher.close();
      console.log('watcher closed!');
    }
  });

  socket.on('error', error => {
    console.log('Socket error: ', error.message);
  });

});

server.listen(60300, () => console.log('Listening for subscribers...'));

server.on('error', error => {
  console.log('Server error: ', error.message);
});
