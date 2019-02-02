module.exports = {
    title: 'Garen 盖伦UI',
    description: '一套基于vue的移动端组件库',
    base:'/garen/',
    themeConfig: {
      nav: [
        { text: 'GitHub', link: 'https://github.com/duyanpeng/garen' }
      ],
      sidebar: [
        {
          title: '开发指南',
          collapsable: false,
          children: [
            ['/induce/','介绍'],
            ['/guide/','快速上手']
          ]
        },
        {
          title: '代码片段',
          children: [ 
            ['/','css'],
            ['/','js'],
            ['/','推荐插件'],
           ]
        },
        {
          title: '组件',
          collapsable: false,
          children: [ 
            ['/','刷新加载'],
            ['/','日期选择'],
            ['/','头像裁剪'],
           ]
        }
      ]
    }
  }