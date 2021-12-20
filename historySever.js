/**
 * node 服务器对history模式的支持
 */
const path = require("path");
// 导入处理 history 模式的模块, 用来处理router中的history模式
const history = require("connect-history-api-fallback");
// 导入 express
const express = require("express");

const app = express();
// 注册处理 history 模式的中间件，开启对history模式的支持
app.use(history());
// 处理静态资源的中间件，网站根目录 ../web
// web文件夹下为前端打包的资源文件
app.use(express.static(path.join(__dirname, "./dist")));

// 开启服务器，端口是 3000
app.listen(3000, () => {
  console.log("服务器开启，端口：3000");
});
