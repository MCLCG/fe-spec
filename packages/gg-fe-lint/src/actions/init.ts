import path from 'path';
import fs from 'fs-extra';
// 用于创建用户交互式的方式执行
import inquirer from 'inquirer';
// cross-spawn 是一个 Node.js 包，用于解决跨平台执行外部命令时的兼容性问题。
// 在不同的操作系统上，执行外部命令的方式可能会有所不同，
// 而 cross-spawn 可以确保在所有平台上一致地执行外部命令。
import spawn from 'cross-spawn';
import update from './update';
import npmType from '../utils/npm-type';
import log from '../utils/log';
import conflictResolve from '../utils/conflict-resolve';
import generateTemplate from '../utils/generate-template';
// PROJECT_TYPES配合inquirer一块使用,使用交互式的方式创建项目
// 要消费的是PROJECT_TYPES的value值
import { PROJECT_TYPES, PKG_NAME } from '../utils/constants';
import type { InitOptions, PKG } from '../types';

let step = 0; // 定义脚手架进行的步骤

/**
 * 步骤1:
 * 选择项目语言和框架
 */
const chooseEslintType = async (): Promise<string> => {
  const { type } = await inquirer.prompt({
    type: 'list', // list的样式
    name: 'type',
    message: `Step ${++step}. 请选择项目的语言（JS/TS）和框架（React/Vue）类型：`,
    choices: PROJECT_TYPES, // 选项就是PROJECT_TYPES,消费的是PROJECT_TYPES里面的value
  });

  return type;
};

/**
 * 步骤2:
 * 选择是否启用 stylelint
 * @param defaultValue
 */
const chooseEnableStylelint = async (defaultValue: boolean): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm', // y/n的形式的样式
    name: 'enable', // 返回enable的值
    message: `Step ${++step}. 是否需要使用 stylelint（若没有样式文件则不需要）：`,
    default: defaultValue,
  });

  return enable;
};

/**
 * 选择是否启用 markdownlint
 */
const chooseEnableMarkdownLint = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 markdownlint（若没有 Markdown 文件则不需要）：`,
    default: true,
  });

  return enable;
};

/**
 * 选择是否启用 prettier
 */
const chooseEnablePrettier = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 Prettier 格式化代码：`,
    default: true,
  });

  return enable;
};

export default async (options: InitOptions) => {
  // cwd是根目录
  const cwd = options.cwd || process.cwd();
  // 判断是不是测试环境
  const isTest = process.env.NODE_ENV === 'test';
  // 是不是需要检查版本并且更新
  const checkVersionUpdate = options.checkVersionUpdate || false;
  // 是不是需要自动安装依赖
  const disableNpmInstall = options.disableNpmInstall || false;
  // 定义整个的config配置项,例如像用户选择stylelint是否安装的结果都放在config里面
  const config: Record<string, any> = {};
  // 得到package.json的路径
  const pkgPath = path.resolve(cwd, 'package.json');

  // package.json里面的结果
  // 可以在PKG interface中看需要用到的配置
  let pkg: PKG = fs.readJSONSync(pkgPath); // 读取package.json的配置

  // 版本检查
  if (!isTest && checkVersionUpdate) {
    await update(false); // 调用更新的命令
  }

  // 初始化 `enableESLint`，默认为 true，无需让用户选择
  if (typeof options.enableESLint === 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = true;
  }

  // 初始化 `eslintType`
  if (options.eslintType && PROJECT_TYPES.find((choice) => choice.value === options.eslintType)) {
    config.eslintType = options.eslintType;
  } else {
    config.eslintType = await chooseEslintType();
  }

  // 初始化 `enableStylelint`
  if (typeof options.enableStylelint === 'boolean') {
    config.enableStylelint = options.enableStylelint;
  } else {
    config.enableStylelint = await chooseEnableStylelint(!/node/.test(config.eslintType));
  }

  // 初始化 `enableMarkdownlint`
  if (typeof options.enableMarkdownlint === 'boolean') {
    config.enableMarkdownlint = options.enableMarkdownlint;
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdownLint();
  }

  // 初始化 `enablePrettier`
  if (typeof options.enablePrettier === 'boolean') {
    config.enablePrettier = options.enablePrettier;
  } else {
    config.enablePrettier = await chooseEnablePrettier();
  }

  // 上面的问答处理完成之后先要处理版本依赖冲突问题
  if (!isTest) {
    log.info(`Step ${++step}. 检查并处理项目中可能存在的依赖和配置冲突`);
    // 看看是不是有版本冲突的依赖项
    // 也就是还未使用当前脚手架中的package.json的依赖中有
    // 和将要使用脚手架安装的依赖项有冲突
    pkg = await conflictResolve(cwd, options.rewriteConfig);
    log.success(`Step ${step}. 已完成项目依赖和配置冲突检查处理 :D`);

    if (!disableNpmInstall) {
      log.info(`Step ${++step}. 安装依赖`);
      const npm = await npmType;
      // 执行安装的命令
      spawn.sync(npm, ['i', '-D', PKG_NAME], { stdio: 'inherit', cwd });
      log.success(`Step ${step}. 安装依赖成功 :D`);
    }
  }

  // 更新 pkg.json
  pkg = fs.readJSONSync(pkgPath);
  // 在 `package.json` 中写入 `scripts`
  if (!pkg.scripts) {
    pkg.scripts = {};
  }
  if (!pkg.scripts[`${PKG_NAME}-scan`]) {
    // 例如像scripts脚本里面写入'encode:scan':'encode-fe-lint scan'脚本
    pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
  }
  if (!pkg.scripts[`${PKG_NAME}-fix`]) {
    pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
  }

  // 配置 commit 卡点
  log.info(`Step ${++step}. 配置 git commit 卡点`);
  if (!pkg.husky) pkg.husky = {};
  if (!pkg.husky.hooks) pkg.husky.hooks = {};
  pkg.husky.hooks['pre-commit'] = `${PKG_NAME} commit-file-scan`;
  pkg.husky.hooks['commit-msg'] = `${PKG_NAME} commit-msg-scan`;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  log.success(`Step ${step}. 配置 git commit 卡点成功 :D`);

  log.info(`Step ${++step}. 写入配置文件`);
  // 植入模版,通过ejs生成模版,让后让ejs去生产即可
  generateTemplate(cwd, config);
  log.success(`Step ${step}. 写入配置文件成功 :D`);

  // 完成信息
  const logs = [`${PKG_NAME} 初始化完成 :D`].join('\r\n');
  log.success(logs);
};
