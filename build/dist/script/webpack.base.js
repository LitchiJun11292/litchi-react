"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 拷贝静态资源
const StylelintPlugin = require("stylelint-webpack-plugin");
const { historyType } = require("./defaultConfig");
const { generateName } = require("./utils");
module.exports = {
    mode: "production",
    /** 入口文件 */
    entry: {
        // vendor: ["react", "react-dom", "redux", "react-redux"],
        app: "./src/index.js",
    },
    output: {
        /** 输出文件的存放路径 */
        path: path.resolve(__dirname, "../dist"),
        /**
         * 是入口文件的输出名字
         * chunkhash hash的区别：hash是所有输出文件共用一个hash，chunkhash是不同文件是不同的hash，可以用这个做缓存
         */
        filename: generateName("[name].[hash:8].js"),
        /**
         * 这里使用chunkhash的好处是，当chunk中只有一个变化时，重新打包只会修改变化的chunk文件名的hash值
         * 此选项影响那些「按需加载 chunk」的输出文件
         */
        chunkFilename: generateName("[id].[chunkhash:8].js"),
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../", "src/"),
            "@static": path.resolve(__dirname, "../", "public"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: {
                    /** options 配置参照 .babelrc.js 文件 */
                    loader: "babel-loader",
                },
                include: [path.resolve(__dirname, "../", "src")],
                // exclude: /node_modules/,
            },
            /** 打包图片 */
            {
                test: /\.(png|jpe?g|gif|bmp)(\?.*)?$/,
                /** url-loader 打包依赖 file-loader，所以还需安装 file-loader */
                loader: "url-loader",
                options: {
                    /**
                     * 当图片小于 limit 时，就会直接处理成 base64；大于 limit 时，输出到 outputPath 对应的文件夹；
                     * 将图片打包成 base64，优点：减少请求数量；缺点：图片体积更大（文件请求更慢）
                     */
                    limit: 25000,
                    name: "media/[name].[hash:8].[ext]",
                    outputPath: generateName("static/"),
                    /**
                     * 问题：这里为什么要将 esModule: false ？
                     * 解答：这是因为在打包图片的时候，之前的loader有使用commonjs，但是url-loader默认用es6的模块语法进行解析
                     * 说明：因为设置了 type: "javascript/auto", 就可以打包 css样式中的背景图片，webpack先用css-loader将url(../1.png) 解析为url(require('./1.png'))最后url-loader遇到后才能进行处理,但是url-loader默认用es6的模块语法进行解析，如果没有设置esModule为false 那么将出现下面这种情况 => [object%16Module]
                     */
                    esModule: false,
                },
                /**
                 * 问题：在css中添加了背景图片，配置url-loader后竟然没效果，而且生成了两个图片，但是其中一个图片内容竟然是代码：export default __webpack_public_path__
                 * 解答：因为webpack5提供了资源模块的原因，所以跟原来的冲突了，需要配置 type: "javascript/auto" 覆盖默认的 defaultRule
                 * 参考文档：https://www.jianshu.com/p/07322ac362c4 , https://blog.csdn.net/zm_miner/article/details/113535324
                 * 备注： 如果是要处理 background: url("./1.png")，需要将 css-loader 中 url 不能设为 false
                 */
                type: "javascript/auto",
            },
            {
                test: /\.(woff2|woff|ttf|svg|eot)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "iconfont/[name].[hash:8].[ext]",
                    outputPath: generateName("static/"),
                    esModule: false,
                },
                type: "javascript/auto",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            /**
             * 用于生成的 HTML 文档的标题，在 html模板中 配置 <title><%= htmlWebpackPlugin.options.title %></title>
             */
            title: "webpack配制学习",
            /**
             * 指定打包出来的html的名字，默认是在output指定的path路径下创建一个叫index.html文件
             */
            filename: "index.html",
            /**
             * 指定模板，也可以指定模板的loader，默认情况下使用 src/index.ejs，如果没有指定则自动生成一个
             */
            template: "./public/index.html",
            /**
             * 处理 html 文档中引用的 图片 不打包问题
             */
            // template:
            //   "html-withimg-loader!" +
            //   path.resolve(__dirname, "../", "public/index.html"),
            /**
             * 指定覆盖模板中的参数变量
             * 如：<div><%= foo %></div>
             */
            templateParameters: {
                foo: "bar",
            },
            /**
             * 打包后的 js 注入的地方，默认为 true
             * true-> 注入head 标签, head-> 注入head 标签, body-> body 标签, false-> 不注入
             */
            inject: true,
            /**
             * html 中引入 js资源 的前缀路径，默认 auto
             * publicPath: "../" 代表往上走以及
             */
            publicPath: "auto",
            /**
             * js资源加载方式 非阻塞 || 延迟，默认 defer
             */
            scriptLoading: "defer",
            /**
             * 注入base标签,  指定js资源加载前缀， 默认 {}
             */
            // base: "http://example.com/",
            /**
             * 缩小输出以什么形式 {Boolean|Object}
             * Object 参考： https://github.com/terser/html-minifier-terser
             */
            // minify: {
            //   html5: true,
            // },
            /**
             * 若为true会在引入的JS和CSS后面加上?hash
             */
            hash: true,
            /**
             * 若为true 只会打包变动的文件， 默认为 true
             */
            cache: false,
        }),
        /**
         * 将 plublic文件下的文件 拷贝到 dist文件下
         * 1、除了index.html
         */
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../", "public"),
                    to: path.resolve(__dirname, "../", "dist"),
                    globOptions: {
                        ignore: [path.resolve(__dirname, "../", "public/index.html")],
                    },
                },
            ],
        }),
        /**
         * 该插件使用 stylelint 帮助你在样式代码中避免错误并强制规范。
         * 配置文档：https://github.com/stylelint/stylelint/tree/9d190899343dfd71967c1d55636d072ea1df94ae
         * 参考文档：https://blog.csdn.net/weixin_41643133/article/details/84229687
         */
        new StylelintPlugin({
            context: "src",
            configFile: path.resolve(__dirname, "../.stylelintrc.js"),
            files: "**/*.(less|css)",
            failOnError: false,
            quiet: true,
            fix: true,
        }),
        /**
         * 给每一个页面或者组件注入一个局部变量
         */
        new webpack.DefinePlugin({
            HISTORYTYPE: JSON.stringify(historyType),
        }),
    ],
};
//# sourceMappingURL=webpack.base.js.map