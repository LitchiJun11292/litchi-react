"use strict";
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.base.js");
const { version, historyType } = require("./defaultConfig");
const { registerMockData } = require("./mock");
const config = {
    mode: "development",
    // watch: true,
    output: {
        publicPath: "/",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "../", "public"),
            // publicPath: "./",
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        /**
         * 监听文件变化，插件 chokidar 也可实现：https://github.com/paulmillr/chokidar
         * 注意：这里的给全路径
         */
        watchFiles: [path.resolve(__dirname, "./../mock/**/*")],
        /**
         * true-开启Browser模式， false-Hash
         */
        historyApiFallback: {
            history: {
                rewrites: [
                    {
                        from: /./,
                        to: (context) => {
                            if (context.parsedUrl.path.startsWith("/api")) {
                                return context.parsedUrl.path;
                            }
                            return "/index.html";
                        },
                    },
                ],
            },
            hash: false,
        }[historyType],
        /** 提供服务器内部在所有其他中间件之执行 自定义中间件的能力 */
        onBeforeSetupMiddleware: function (devServer) {
            if (!devServer) {
                throw new Error("webpack-dev-server is not defined");
            }
            /** 注册mock数据 */
            registerMockData(devServer);
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
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
                    "style-loader",
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
         * 给每一个页面或者组件注入一个局部变量
         */
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(version),
        }),
        /**
         * 启用 HMR
         */
        new webpack.HotModuleReplacementPlugin({}),
    ],
};
module.exports = merge(common, config);
//# sourceMappingURL=webpack.dev.js.map