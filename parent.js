console.log("Parent Running...");

setInterval(() => {}, 1e6); // Keeps Node running the process

const { fork } = require('child_process');

const { join } = require('path');

const child = fork(join(__dirname, 'child.js'));

child.on("message", (m) => {
  console.log("Parent get message:", m);
});

setTimeout(() => {

  child.send({ coucou: 'Steph' }, (err) => console.log('Send coucou', err));

}, 1000);
