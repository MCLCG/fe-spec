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
        items: [{ text: 'HTML 编码规范', link: '/coding/html.md' }],
      },
      {
        text: '关于',
        link: '/index.md',
      },
    ],
    sidebar: [
      {
        title: 'NPM包',
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
