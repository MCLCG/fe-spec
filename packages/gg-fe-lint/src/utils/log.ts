import chalk from 'chalk';

import { PKG_NAME, UNICODE } from './constants';

const { green, blue, yellow, red } = chalk;

export default {
  success(text: string) {
    console.log(green(text));
  },
  info(text: string) {
    console.info(blue(text));
  },
  warn(text: string) {
    console.info(yellow(text));
  },
  error(text: string) {
    console.error(blue(text));
  },
  result(text: string, pass: boolean) {
    console.info(`[${PKG_NAME}] ${text}`, pass ? green(UNICODE.success) : red(UNICODE.failure));
  },
};
