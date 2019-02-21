module.exports = {
  title: 'Garen 盖伦UI',
  description: '一套基于vue的移动端组件库',
  base: '/garen/',
  head: [
    ['link', {
      rel: 'shortcut icon',
      type: "image/x-icon",
      href: `./favicon.ico`
    }]
  ],
  themeConfig: {
    nav: [{
      text: 'GitHub',
      link: 'https://github.com/duyanpeng/garen'
    }],
    sidebar: [{
        title: '开发指南',
        collapsable: false,
        children: [
          ['/induce/', '介绍'],
          ['/guide/', '快速上手']
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          ['/components/loadmore/', '刷新加载'],
          ['/components/picker/', '滚动选择'],
          ['/components/upload/', '图片上传'],
          ['/components/cropper/', '头像裁剪'],
          ['/components/tabs/', '选项卡'],
          ['/components/swiper/', '轮播图'],
        ]
      },
      {
        title: '代码片段',
        children: [
          ['/snippets/css/', 'css片段'],
          ['/snippets/js/', 'js片段'],
          ['/snippets/vue/', 'vue组件片段'],
        ]
      }
    ]
  }
}