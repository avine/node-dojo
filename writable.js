const { Writable } = require('stream');

function delay(t = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      // console.log('...');
      resolve();
    }, t);
  });
}

let position = 0;
const b = Buffer.alloc(1024);

class W extends Writable {
  _write(chunk, encoding, callback) {
    // console.log(chunk.toString());
    b.write(chunk, position);
    position += chunk.toString().length;
    delay().then(callback);
  }
}

const w = new W({
  objectMode: true
});

/*
process.stdin.pipe(w);

w.once('drain', () => {
  console.log('ready');
});
*/

/*
let i = 10000;
while (i--) {
  let buffer = Buffer.alloc(10000);
  if (!w.write(buffer)) {
    console.error('oups!');
  }
}
*/

let drain = 0;

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      drain++;
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(w, 'blabla', 'utf8', () => {
  console.log('Yeah!', drain);
  console.log(b.toString());
});
