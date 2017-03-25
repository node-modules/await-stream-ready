'use strict';

const isReadable = require('isstream').isReadable;
const isWritable = require('isstream').isWritable;

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
