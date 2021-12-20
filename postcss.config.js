module.exports = {
  plugins: [
    require("autoprefixer"),
    /**
     * autoprefixer 不起作用，是因为没有配置 .browserslistrc, 也可配置如下
     * 参考文档：https://blog.csdn.net/weixin_46857582/article/details/106206479
     * 配置连接：https://github.com/browserslist/browserslist
     */
    // ({
    //   overrideBrowserslist: [
    //     "defaults",
    //     "not ie < 11",
    //     "last 2 versions",
    //     "> 1%",
    //     "iOS 7",
    //     "last 3 iOS versions",
    //   ],
    // }),
  ],
};
