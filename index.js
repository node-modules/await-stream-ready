'use strict';

const awaitStream = require('./lib/await');

exports.read = stream => awaitStream(stream, 'read');
exports.write = stream => awaitStream(stream, 'write');
