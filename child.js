console.log("Child Running...");

process.on("message", (m) => {
  console.log("Child get message:", m);
});

process.send("I love you too");

//process.emit('message', 'EMIT!');

setTimeout(() => {}, 1000000);
