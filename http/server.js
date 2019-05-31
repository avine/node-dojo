const { createServer } = require('http');

const { join } = require('path');
const { promises } = require('fs');

function delay(t = 500) {
  return new Promise(resolve => {
    setTimeout(resolve, t);
  });
}

const server = createServer((req, res) => {

  async function go() {
    const pathFile = join(__dirname, '../package-lock.json');
    const fd = await promises.open(pathFile, 'r');
    const stats = await fd.stat();

    const fileSize = stats.size;

    let position = 0;
    do {
      const bufferSize = Math.min(512, fileSize - position);

      const buffer = Buffer.alloc(bufferSize);

      const { bytesRead } = await promises.read(fd, buffer, 0, bufferSize, position);

      position += bytesRead;

      res.write(buffer, error => !error || console.error(error.message));

      await delay();

    } while (position < fileSize);

    res.end();
  }

  go();
});

server.listen(4500, undefined, undefined, () => {
  console.log('Server up and running on port 4500');
});
