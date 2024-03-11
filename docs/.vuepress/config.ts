import { defineConfig4CustomTheme, UserConfig } from 'vuepress/config';

export default defineConfig4CustomTheme({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '国国技术官网',
      description: '前端编码规范工程化',
    },
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/index.md' },
      {
        text: '编码规范',
        items: [
          { text: 'HTML 编码规范', link: '/coding/html.md' },
          { text: 'CSS 编码规范', link: '/coding/css.md' },
          { text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
          { text: 'Typescript 编码规范', link: '/coding/typescript.md' },
          { text: 'Node 编码规范', link: '/coding/node.md' },
        ],
      },
      {
        text: '关于',
        link: '/index.md',
      },
    ],
    sidebar: [
      {
        title: 'NPM包',
        children: [
          { title: 'eslint-config-encode', path: '/npm/eslint.md' },
          { title: 'stylelint-config-encode', path: '/npm/stylelint.md' },
          { title: 'commitlint-config-encode', path: '/npm/commitlint.md' },
          { title: 'markdownlint-config-encode', path: '/npm/markdownlint.md' },
          { title: 'eslint-plugin-encode', path: '/npm/eslint-plugin.md' },
        ],
      },
    ],
  },
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    [
      'meta',
      {
        name: 'keywords',
        content: '前端编码规范工程化',
      },
    ],
  ],
  extraWatchFiles: ['.vuepress/config.ts'],
});
