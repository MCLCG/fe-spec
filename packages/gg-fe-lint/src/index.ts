import ora from 'ora';
import scanAction from './actions/scan';
import initAction from './actions/init';
import { PKG_NAME } from './utils/constants';
import printReport from './utils/print-report';
import type { InitOptions, ScanOptions } from './types';

type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;

// 那么这个cli要实现哪些能力呢
// 1.交互使用commander或者chalk
// 2.

// 入口文件应当创建初始化的逻辑
// 这里就是encode-fe-lint init会进行的操作
// options是告诉cli要进行哪些初始化的配置项
// 像cwd,checkVersionUpdate这些的配置项
// 使用像encode-fe-lint init({rewriteConfig:true})
// 剔除掉checkVersionUpdate属性
export const init = async (options: IInitOptions) => {
  // initAction就是脚手架的核心
  return await initAction({
    ...options,
    checkVersionUpdate: false, // 默认在init的时候进行检查版本并更新
  });
};

export const scan = async (options: ScanOptions) => {
  const checking = ora();
  checking.start(`执行 ${PKG_NAME} 代码检查`);

  const report = await scanAction(options);
  const { results, errorCount, warningCount } = report;
  let type = 'succeed';
  if (errorCount > 0) {
    type = 'fail';
  } else if (warningCount > 0) {
    type = 'warn';
  }

  checking[type]();
  if (results.length > 0) printReport(results, false);

  return report;
};
