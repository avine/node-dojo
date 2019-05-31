setTimeout(() => {
  console.log("now stop");
}, 1000);

let intervalId = setInterval(() => {
  console.log("running")
}, 300);

intervalId.unref();

