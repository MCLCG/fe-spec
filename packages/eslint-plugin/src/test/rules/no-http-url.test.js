'use strict';

const rule = require('../../rules/no-http-url');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-http-url test', rule, {
  valid: [
    {
      code: "var url = 'https://changguo.com';",
    },
  ],
  invalid: [
    {
      code: "var url = 'http://changguo.com';",
      output: "var url = 'http://changguo.com';",
      errors: [
        {
          message: 'Recommended "http://changguo.com" switch to HTTPS',
        },
      ],
    },
  ],
});
