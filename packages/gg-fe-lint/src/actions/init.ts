import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import update from './update';
import npmType from '../utils/npm-type';
import log from '../utils/log';

import { PROJECT_TYPES, PKG_NAME } from '../utils/constants';

import type { InitOptions, PKG } from '../types';

let step = 0;

export default async (options: InitOptions) => {
  const cwd = options.cwd || process.cwd();
  const isTest = process.env.NODE_ENV === 'test';
  const checkVersionUpdate = options.checkVersionUpdate || false;
  const disableNpmInstall = options.disableNpmInstall || false;
  const config = {};
  const pkgPath = path.resolve(cwd, 'package.json'); // 得到pacaage.json的路径

  let pkg: PKG = fs.readJsonSync(pkgPath); // 读取package.json的配置

  if (!isTest && checkVersionUpdate) {
    await update(false);
  }
};
