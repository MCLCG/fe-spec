import { execSync } from 'child_process';
import ora from 'ora';

import log from '../utils/log';

import npmType from '../utils/npm-type'; // 得到包管理工具是pnpm还是npm

import { PKG_NAME, PKG_VERSION } from '../utils/constants';

const checkLatestVersion = async (): Promise<string | null> => {
  const npm = await npmType; // npmtype使用的是command-exists库的封装用于判断是否存在某个命令
  // 子进程的同步执行execSync
  // execSync主要是执行命令的函数
  // 下面的命令相当于 npm view axios version,然后就会得到axios最近的版本了
  const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString('utf-8').trim();

  if (PKG_VERSION === latestVersion) return null;

  const compareArr = PKG_VERSION.split('.').map(Number); // .map(Number)这种写法是将结果转成number的格式
  const beComparedArr = latestVersion.split('.').map(Number);

  // 依次比较版本号每一位大小
  for (let i = 0; i < compareArr.length; i++) {
    if (compareArr[i] > beComparedArr[i]) {
      return null;
    } else if (compareArr[i] < beComparedArr[i]) {
      return latestVersion; // 返回最新的版本
    }
  }
};

// install用于是自动安装的配置选项
export default async (install = true) => {
  const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`);
  checking.start();

  try {
    const npm = await npmType;
    const latestVersion = await checkLatestVersion();

    checking.stop();

    if (latestVersion && install) {
      const update = ora(`[${PKG_NAME}] 存在新版本，将升级至 ${latestVersion}`);
      update.start();

      execSync(`${npm} i ${PKG_NAME}`);

      update.stop();
    } else if (latestVersion) {
      log.warn(
        `最新版本为 ${latestVersion}，本地版本为 ${PKG_VERSION}，请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`,
      );
    } else if (install) {
      log.info(`当前没有可用的更新`);
    }
  } catch (error) {
    checking.stop();
    log.error(error);
  }
};
