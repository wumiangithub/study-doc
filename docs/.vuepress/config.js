module.exports = {
  title: "前端学习笔记",
  description: "前端学习笔记、前端面试题、vue面试题、react面试题",
  port: 1234,
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "学习文档收集", link: "/article/" },
      {
        text: "技术",
        items: [
          { text: "前端", link: "/web/" },
          { text: "vue", link: "/vue/" },
          { text: "react", link: "/react/" },
          { text: "typescript", link: "/ts/" },
          { text: "webpack", link: "/webpack/" },
          { text: "flutter", link: "/flutter/" },
          { text: "uniapp", link: "/uniapp/" },
          { text: "taro", link: "/taro/" },
          { text: "微信小程序", link: "/wx_mini/" },
          { text: "微信公众号", link: "/wx_public/" },
          { text: "算法", link: "/suanfa/" },
          { text: "node", link: "/node/" },
          { text: "vue2源码", link: "/vue2_source_code/" },
          { text: "vue3源码", link: "/vue3_source_code/" },
          { text: "angular", link: "/angular/" },
          { text: "快捷键", link: "/shortcut/" },
          { text: "终端", link: "/terminal/" },
          { text: "markdown", link: "/markdown/" },
          { text: "vuepress", link: "/vuepress/" },
          { text: "工具和软件", link: "/gongju/" },
          { text: "其他", link: "/other/" },
        ],
      },
    ],
    // nav: [
    // {
    //   text: "首页",
    //   link: "/",
    // },
    // {
    //   text: "技术",
    //   items: [
    //     // { text: "vue", link: "/vue" },
    //     // { text: "react", link: "/react" },
    //     { text: "ts", link: "/ts/" },
    //   ],
    // },
    // {
    //   text: "Languages",
    //   items: [
    //     { text: "Chinese", link: "/language/chinese" },
    //     { text: "Japanese", link: "/language/japanese" },
    //   ],
    // },
    // ],

    sidebar: {
      "/ts/": [
        {
          title: "typescript",
          collapsable: true,
          children: [
            ["", "学习文档"],
            ["type", "申明类型"],
            ["as", "类型断言"],
            ["interface", "interface"],
            ["t", "泛型"],
          ],
        },
      ],
      "/vue/": [
        {
          title: "vue",
          collapsable: true,
          children: [
            ["", "vue"],
            ["vue2vs3", "vue2和vue3区别"],
            ["two", "two"],
            ["vue2", "vue2"],
            ["vue3", "vue3"],
            ["vue3_mianshi", "vue3面试题"],
            ["nuxtjs", "nuxtjs"],
          ],
        },
      ],
      "/react/": [
        {
          title: "react",
          collapsable: true,
          children: [
            ["", "react"],
            ["life-cycle", "生命周期"],
            ["hooks", "hooks"],
            ["redux", "redux"],
            ["react-redux", "react-redux"],
            ["redux-saga", "redux-saga"],
            ["dva", "dva"],
            ["umi", "umi"],
            ["umi4", "umi4"],
            ["shengtai", "生态"],
            ["nextjs", "nextjs"],
          ],
        },
      ],
      "/web/": [
        {
          title: "前端",
          collapsable: true,
          children: [
            ["", "前端"],
            ["zhishi", "知识点"],
            ["mianshi", "面试题"],
            ["mianshi1", "面试题-1"],
            ["mianshi_lilun", "面试题-理论"],
            ["mianshi_lilun1", "面试题-理论-1"],
            ["mianshi_xingneng", "面试题-性能优化"],
            ["es6", "es6"],
            ["safe", "网络安全"],
            ["css", "css"],
            ["less", "less"],
            ["sass", "sass"],
            ["regexp", "正则"],
            ["canvas", "canvas"],
            ["webGL", "webGL"],
            ["threejs", "threejs"],
            ["electron", "electron"],
            ["error", "错误收集"],
            ["jiagou", "架构"],
            ["tiaoshi", "调试"],
          ],
        },
      ],
      "/webpack/": [
        {
          title: "webpack",
          collapsable: true,
          children: [
            ["", "webpack"],
            ["mianshi", "面试"],
            ["xingneng", "性能优化"],
            ["build_xingneng", "优化打包构建速度"],
          ],
        },
      ],
      "/vue2_source_code/": [""],
      "/vue3_source_code/": [""],
      "/flutter/": [""],
      "/node/": [""],
      "/uniapp/": [""],
      "/taro/": [""],
      "/wx_mini/": [
        {
          title: "微信小程序",
          collapsable: true,
          children: [
            ["", "小程序"],
            ["login_pay", "登录和支付"],
          ],
        },
      ],
      "/wx_public/": [
        {
          title: "微信公众号",
          collapsable: true,
          children: [["", "公众号"]],
        },
      ],
      "/angular/": [""],
      "/suanfa/": [
        {
          title: "算法",
          collapsable: true,
          children: [
            ["", "算法"],
            ["array", "数组"],
            ["jiami", "加密"],
            ["yunsuan", "运算题"],
            ["timu", "题目"],
          ],
        },
      ],
      "/shortcut/": [""],
      "/markdown/": [""],
      "/vuepress/": [""],
      "/terminal/": [""],
      "/gongju/": [""],
      "/other/": [
        {
          title: "其他",
          collapsable: true,
          children: [
            ["", "其他"],
            ["keyword", "关键字概念"],
            ["normal", "面试通用问题"],
          ],
        },
      ],
      // "/": [""], //这个一定要放最后, 或者直接就不要
    },

    // sidebar: {
    //   "/": [""],
    //   "/ts/": [
    //     {
    //       title: "申明类型",
    //       collapsable: true,
    //       path: "",
    //       children: [{ title: "申明类型", path: "/" }],
    //     },
    //     {
    //       title: "interface",
    //       collapsable: true,
    //       path: "/ts/interface",
    //       children: [{ title: "interface", path: "/ts/interface" }],
    //     },
    //   ],
    // },

    // sidebar: "auto",

    // sidebar: [
    //   { title: "markdown", children: [["/", "常用写法"]] },
    //   {
    //     title: "typescript",
    //     path: "/ts1/",
    //     children: ["/ts1/index.md", "/ts1/interface.md"],
    //   },
    // ],
  },
};
