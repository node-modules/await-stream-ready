'use strict';

const path = require('path');
const assert = require('assert');
const fs = require('mz/fs');
const Transform = require('stream').Transform;
const awaitReadStream = require('..').read;
const fixtures = path.join(__dirname, 'fixtures');

describe('test/read.test.js', () => {
  it('should wait consuming read stream', function* () {
    const stream = fs.createReadStream(path.join(fixtures, 'file.svg'));
    let size = 0;
    stream.on('data', buf => {
      size += buf.length;
    });
    yield awaitReadStream(stream);
    assert(size === 14193);
  });

  it('should throw it is not a readable stream', function* () {
    try {
      yield awaitReadStream();
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'Only support readable stream');
    }
  });

  it('should throw when error emit', function* () {
    const stream = fs.createReadStream(path.join(fixtures, 'file.svg'));
    process.nextTick(() => {
      stream.emit('error', new Error('error'));
    });
    try {
      yield awaitReadStream(stream);
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'error');
    }
  });

  it('should auto resume readable stream', function* () {
    const stream = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk);
      },
    });
    process.nextTick(() => {
      stream.write('1');
      stream.write('2');
      stream.end();
    });
    yield awaitReadStream(stream);
  });
});
