'use strict';

const Stream = require('stream').Stream;

module.exports = (stream, type) => {
  return new Promise((resolve, reject) => {
    if (type === 'read' && !isReadable(stream)) return reject(new Error('Only support readable stream'));
    if (type === 'write' && !isWritable(stream)) return reject(new Error('Only support writable stream'));

    const event = type === 'read' ? 'end' : 'finish';

    stream.once(event, success);
    stream.once('error', fail);

    if (isReadable(stream)) stream.resume();

    function success() {
      clean();
      resolve();
    }
    function fail(err) {
      clean();
      reject(err);
    }
    function clean() {
      stream.removeListener(event, success);
      stream.removeListener('error', fail);
    }
  });
};

function isReadable(stream) {
  return isStream(stream) && typeof stream._read === 'function';
}

function isWritable(stream) {
  return isStream(stream) && typeof stream._write === 'function';
}

function isStream(stream) {
  return stream instanceof Stream;
}
