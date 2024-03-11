'use strict';

const feSpec = require('..');
const assert = require('assert').strict;

assert.strictEqual(feSpec(), 'Hello from feSpec');
console.info('feSpec tests passed');
