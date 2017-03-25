'use strict';

const path = require('path');
const assert = require('assert');
const fs = require('mz/fs');
const awaitWriteStream = require('..').write;
const fixtures = path.join(__dirname, 'fixtures');

describe('test/write.test.js', () => {
  const file = path.join(fixtures, 'write.svg');

  after(function* () {
    if (yield fs.exists(file)) {
      yield fs.unlink(file);
    }
  });

  it('should wait writing stream', function* () {
    const stream = fs.createWriteStream(file);
    process.nextTick(() => {
      writeBuffer(stream);
      stream.end();
    });
    yield awaitWriteStream(stream);
    const stat = yield fs.stat(file);
    assert(stat.size === 1000);
  });

  it('should throw it is not a writable stream', function* () {
    try {
      yield awaitWriteStream();
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'Only support writable stream');
    }
  });

  it('should throw when error emit', function* () {
    const stream = fs.createWriteStream(file);
    process.nextTick(() => {
      stream.emit('error', new Error('error'));
    });
    try {
      yield awaitWriteStream(stream);
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'error');
    }
  });
});

function writeBuffer(stream) {
  let len = 1000;
  while (len > 0) {
    stream.write(new Buffer('1'));
    len--;
  }
}
