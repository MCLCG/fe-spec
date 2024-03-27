#!/usr/bin/env node

// 上面指定由node环境执行
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import glob from 'glob';
import spawn from 'cross-spawn';
import { program } from 'commander';
import { execSync } from 'child_process';

import init from './actions/init';
import update from './actions/update';
import scan from './actions/scan';

import log from './utils/log';
import printReports from './utils/print-reports';
import npmType from './utils/npm-type';
import generateTemplate from './utils/generate-template';

import { PKG_NAME, PKG_VERSION } from './utils/constants';

const cwd = process.cwd();

program
  .version(PKG_VERSION)
  .description(
    `${PKG_NAME} 是 前端编码规范工程化的配置lint工具 提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡点，降低项目实施规范的成本`,
  );

program
  .command('init')
  .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
  .option('--vscode', '写入.vscode/setting.json配置')
  .action(async (cmd) => {
    if (cmd.vscode) {
      const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
      generateTemplate(cwd, require(configPath), true);
    } else {
      await init({
        cwd,
        checkVersionUpdate: true,
      });
    }
  });
program.parse(process.argv);
