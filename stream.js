const { Readable } = require('stream');

function FeedOld() {
  const readable = new Readable({
    objectMode: true
  });

  const news = ['Big Win!', 'Stocks Down!', 'Actor Sad!', 'Shoupi'];

  readable._read = () => {
    if (news.length) {

      const chunk = news.shift();

      // console.log('chunk:', (chunk || '').toString());

      return readable.push(chunk);
    }
    readable.push(null);
  };

  return readable;
}

class Feed extends Readable {
  constructor() {
    super({ objectMode: true });
    this.data = [1, 2, 3];
  }

  _read() {
    const chunk = this.data.shift();
    this.push(chunk || null);
  }
}

const feed = new Feed();

/*feed.on('readable', () => {
  console.log('> readable');
  let data, i = 0;
  while (data = feed.read()) {
    console.log(++i, data);
  }
});*/

feed.on('data', (chunk) => {
  console.log('data:', chunk);
});

feed.on('end', () => {
  console.log('end!');
});

// console.log( feed.read().toString() );
