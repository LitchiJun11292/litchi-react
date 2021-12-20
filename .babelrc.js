/**
 * 配置参考：https://www.yuque.com/docs/share/826756b5-ef69-4010-ab5d-cef9ef815e46?# 《babel》
 */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      /**
       * @babel/plugin-transform-runtime 也能实现按需打包并自动引入polyfill，详细信息参考头部链接
       */
      {
        // useBuiltIns: "usage",
        // corejs: 3,
        // modules: process.env.npm_config_closure ? false : "auto",
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
  ],
};
