const { createConnection } = require('net');

const { createInterface } = require('readline');

const interface = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const socket = createConnection({
  port: 4400
}, () => {
  console.log('Connected!');
});

interface.on('line', string => {
  const flushed = socket.write(Buffer.from(string), error => {
    if (error) console.log('Write error', error);
  });
  // console.log('flushed', flushed);
});

socket.on('data', data => {
  console.log(data.toString());
});

socket.on('drain', () => {
  console.log('Ready!');
});

socket.on('close', error => {
  console.log('Closed with error', error);
  process.exit(0);
});

socket.on('error', error => {
  console.log('Error', error.message);
  process.exit(1);
});
