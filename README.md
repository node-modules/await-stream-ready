# await-stream-ready

A promise waiting stream ready

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/await-stream-ready.svg?style=flat-square
[npm-url]: https://npmjs.org/package/await-stream-ready
[travis-image]: https://img.shields.io/travis/node-modules/await-stream-ready.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/await-stream-ready
[codecov-image]: https://codecov.io/gh/node-modules/await-stream-ready/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/await-stream-ready
[david-image]: https://img.shields.io/david/node-modules/await-stream-ready.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/await-stream-ready
[snyk-image]: https://snyk.io/test/npm/await-stream-ready/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/await-stream-ready
[download-image]: https://img.shields.io/npm/dm/await-stream-ready.svg?style=flat-square
[download-url]: https://npmjs.org/package/await-stream-ready

---

## Usage

```bash
npm i await-stream-ready --save
```

Wait a read stream

```js
const fs = require('fs');
const awaitReadStream = require('await-stream-ready').read;

async function read(file) {
  const stream = fs.createReadStream(file);
  stream.on('data', buf => {
    // consume buf
  });
  await awaitReadStream(stream);
}
```

Or wait a write stream

```js
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;

async function write(srcStream, file) {
  const stream = srcStream.pipe(fs.createWriteStream(file));
  await awaitWriteStream(stream);
}
```

**It will switch the readable stream to flowing mode automatically.**

## License

[MIT](LICENSE)
