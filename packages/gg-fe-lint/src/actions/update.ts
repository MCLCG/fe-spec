import { execSync } from 'child_process';
import ora from 'ora';

import log from '../utils/log';

import npmType from '../utils/npm-type'; // 得到包管理工具是pnpm还是npm

import { PKG_NAME, PKG_VERSION } from '../utils/constants';

// install用于是自动安装的配置选项
export default async (install = true) => {
  const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`);

  checking.start();
  setTimeout(() => {
    checking.stop();
  }, 3000);
};
