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
          { text: "vue", link: "/vue/" },
          { text: "react", link: "/react/" },
          { text: "typescript", link: "/ts/" },
          { text: "前端", link: "/web/" },
          { text: "快捷键", link: "/shortcut/" },
          { text: "markdown", link: "/markdown/" },
          { text: "vuepress", link: "/vuepress/" },
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
          ],
        },
      ],
      "/react/": [
        {
          title: "react",
          collapsable: true,
          children: [
            ["", "react"],
            ["redux", "redux"],
            ["dva", "dva"],
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
            ["mianshi_lilun", "面试题-理论"],
            ["mianshi_xinneng", "面试题-性能优化"],
          ],
        },
      ],
      "/shortcut/": [""],
      "/markdown/": [""],
      "/vuepress/": [""],
      "/other/": [""],
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
