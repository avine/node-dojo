const { createServer } = require('net');

const { createInterface } = require('readline');

const interface = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const sockets = [];

const server = createServer(socket => {
  sockets.push(socket);
  const index = sockets.length;

  const lineHandler = string => {
    const flushed = socket.write(Buffer.from(`(0) ${string}`), error => {
      if (error) console.log('Write error', error);
    });
    // console.log('flushed', flushed);
  }
  interface.on('line', lineHandler);

  socket.on('data', data => {
    console.log(`(${index}) ${data.toString()}`);

    sockets.forEach(s => {
      if (s !== socket) {
        s.write(Buffer.from(Buffer.from(`(${index}) ${data.toString()}`)))
      }
    });
  });

  socket.on('drain', () => {
    console.log('Ready!');
  });

  socket.on('error', error => {
    console.log('Socket error: ', error.message);

    interface.off('line', lineHandler);
    sockets.splice(sockets.indexOf(socket), 1);
  });

  /*setTimeout(() => {
    socket.end(() => {
      console.log('Socket closed');
    })
  }, 5000);*/
});

server.listen(4400, undefined, undefined, () => {
  console.log('Server is listening on port 4300...');
});

server.on('error', error => {
  console.log('Server error: ', error.message);
});
