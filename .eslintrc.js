/**
 * 配置文档：https://eslint.bootcss.com/docs/user-guide/configuring
 */
module.exports = {
  root: true,
  /**
   * ESLint 预设
   * 开启内置“推荐”配置
   */
  extends: [
    "eslint:recommended",
    /** 配置文档：https://github.com/yannickcr/eslint-plugin-react#configuration */
    "plugin:react/recommended",
    /** 配置文档：https://www.npmjs.com/package/@typescript-eslint/eslint-plugin */
    "plugin:@typescript-eslint/recommended",
  ],
  /**
   * 定义全局变量
   */
  globals: {
    window: true,
    describe: true,
    test: true,
    expect: true,
  },
  parserOptions: {
    /** ECMAScript 版本为 10 */
    ecmaVersion: 10,
    /** 代码是 ECMAScript 模块 */
    sourceType: "module",
    ecmaFeatures: {
      /** 启用 JSX */
      jsx: true,
    },
  },
  /**
   * ESLint 本身尚不支持的类型（Flow）或实验性功能，则只需要使用 babel-eslint
   * 配置文档：https://www.npmjs.com/package/babel-eslint
   */
  // parser: "babel-eslint",
  /**
   * 告诉 ESLint 使用您安装的解析器包 ( @typescript-eslint/parser)
   * 配置文档：https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/docs/linting/README.md
   */
  parser: "@typescript-eslint/parser",
  /** 启用环境 */
  env: {
    /** 自动启用es6语法 */
    es6: true,
    browser: true,
    node: true,
  },
  plugins: [
    /**
     * react 插件
     * 配置文档：https://github.com/yannickcr/eslint-plugin-react#configuration
     */
    "react",
    /**
     * babel-eslint 辅助插件
     * 配置文档：https://github.com/babel/eslint-plugin-babel
     */
    "babel",
    /**
     * 告诉 ESLint 加载你安装的插件包 ( @typescript-eslint/eslint-plugin)
     * 配置文档：https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/docs/linting/README.md (推荐)
     */
    "@typescript-eslint",
  ],
  /**
   * 添加共享设置
   */
  settings: {
    react: {
      version: "detect",
    },
  },
  /**
   * 配置文档：https://eslint.bootcss.com/docs/rules/
   */
  rules: {
    /** 配置文档：https://zhuanlan.zhihu.com/p/272797097 */
    // "prettier/prettier": 2,
    "generator-star-spacing": ["error", { before: false, after: true }],
    "react/display-name": "off",
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "before", ":": "before" } },
    ],
    "no-case-declarations": ["off"],
    /** ts 部分 */
    "@typescript-eslint/no-explicit-any": ["off"],
    /** node 部分 */
    "no-var-requires": 0,
  },
};
