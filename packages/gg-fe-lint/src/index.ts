import ora from 'ora';

import scanAction from './actions/scan';
import initAction from './actions/init';

import { PKG_NAME } from './utils/constants';

import printReport from './utils/print-reports';

import type { InitOptions, ScanOptions } from './types';

// 剔除掉checkVersionUpdate属性
type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;

export const init = async (options: IInitOptions) => {
  return await initAction({
    ...options,
    checkVersionUpdate: true, // 默认在init的时候进行检查版本并更新
  });
};
