// child_process用于在Node.js环境中创建子进程，以便执行系统命令、Shell命令或其他可执行文件。
// 它允许你与子进程进行交互，包括发送输入数据和接收输出数据。
// execSync是同步执行的子进程
// 简单描述用户可以通过脚本/命令行实现人机交互
import { execSync } from 'child_process';
// ora是一个用于创建终端加载动画的 Node.js 包。
// 它提供了一种简单而灵活的方式来在命令行界面中显示各种加载状态的动画，
// 比如旋转的符号、进度条等，以提升用户体验。
import ora from 'ora';
import log from '../utils/log'; // log是向用户控制台输出的字体等展示的样式,使用chalk实现
import npmType from '../utils/npm-type'; // 得到包管理工具是pnpm还是npm
// 默认的常量从package.json中去读
import { PKG_NAME, PKG_VERSION } from '../utils/constants';

/**
 * 检查最新版本号
 * 判断某个依赖项是否需要更新版本
 * 比如说产品发布的时候希望通过脚手架可以自动的检查并且更新版本
 */
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

/**
 * 检查包的版本
 * @param install - 用于是自动安装的配置选项
 */
export default async (install = true) => {
  // ora是loading的展示
  const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`);
  checking.start(); // loading效果开始

  try {
    const npm = await npmType;
    const latestVersion = await checkLatestVersion(); // 检查版本
    checking.stop(); // loading效果结束

    if (latestVersion && install) {
      const update = ora(`[${PKG_NAME}] 存在新版本，将升级至 ${latestVersion}`);

      update.start(); // 更新版本开始

      execSync(`${npm} i -g ${PKG_NAME}`); // 启动子进程去执行安装的命令

      update.stop();
    } else if (latestVersion) {
      log.warn(
        `最新版本为 ${latestVersion}，本地版本为 ${PKG_VERSION}，请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`,
      );
    } else if (install) {
      log.info(`当前没有可用的更新`);
    }
  } catch (e) {
    checking.stop();
    log.error(e);
  }
};
