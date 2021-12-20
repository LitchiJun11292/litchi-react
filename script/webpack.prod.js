const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { generateName } = require("./utils");
const { isHistory } = require("./defaultConfig");

const config = {
  mode: "production",
  output: {
    /**
     * 输出解析文件的目录，指定资源文件引用的目录
     */
    publicPath: isHistory ? "/" : "./",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false, // 关闭 css modules
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              }, // 开启 css modules
              // url: false, // 禁用 url()中 路径映射处理
            },
          },
          /**
           * 如要给postcss-loader添加插件，请配置到 postcss.config.js 文件，否则报错
           * 参考文档：https://blog.csdn.net/weixin_43859511/article/details/119804842
           */
          "postcss-loader",
          "less-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    /**
     * 默认打包之前清除 dist 文件下的文件，命令行 rm -rf dist 也可达到此效果
     */
    // new CleanWebpackPlugin(),
    /** 为每个包含 CSS 的 JS 文件创建一个 CSS 文件 */
    new MiniCssExtractPlugin({
      filename: generateName("[name].[hash:8].css"),
      chunkFilename: generateName("[id].[chunkhash:8].css"),
    }),
    /**
     * 给每一个页面或者组件注入一个局部变量
     */
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(""),
    }),
    /**
     * 该插件将根据模块的相对路径生成哈希值，生成一个四字符的字符串作为模块 id，没有修改的文档 hash 值不会变，可在app.js中查看
     * 解说文档：https://www.imooc.com/article/details/id/21538
     */
    new webpack.ids.HashedModuleIdsPlugin(),
  ],
  optimization: {
    /**
     * 有多个入口文件时，可以进行公用包的提取
     * 参考文档：https://blog.csdn.net/weixin_42755677/article/details/108232479
     */
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
    /** minimize: true 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。 */
    minimize: true,
    minimizer: [
      /**
       * 优化和缩小 CSS
       * 配置文档：https://github.com/webpack-contrib/css-minimizer-webpack-plugin
       * For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
       */
      new CssMinimizerPlugin(),
      /**
       * 压缩 JavaScript
       * https://webpack.docschina.org/plugins/terser-webpack-plugin/
       */
      new TerserPlugin(),
    ],
    /**
     * 此配置是配置插件 webpack.optimize.ModuleConcatenationPlugin，生成默认开启，否则 false
     * 作用：预编译所有模块作用域到一个闭包中，提升代码在浏览器中的执行速度
     */
    // concatenateModules: !process.env.npm_config_closure,
  },
};

/**
 * `npm run build --report` 将会开启服务，查看构建包信息
 * 命令行 webpack --analyze  也可以达到此效果
 */
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, config);
