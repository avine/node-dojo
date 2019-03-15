import sum from "./sum";

let n = 0;

setInterval(() => {
  n = sum(n, 1);
  // tslint:disable-next-line:no-console
  console.log( n );
}, 1000);
