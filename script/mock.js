const path = require("path");
const chokidar = require("chokidar");
const chalk = require("chalk");
const { fileDisplay, decacheRequire } = require("./utils");

/** 存放 mock api对应的文件地址 */
const routerPaths = {};

/**
 * 注册 mock 数据
 * @param devServer node服务
 */
exports.registerMockData = (devServer) => {
  /**
   * 使用中间件处理mock接口
   */
  devServer.app.use(function (req, res, next) {
    const url = req?.url?.split("?")?.[0];
    const filedir = routerPaths?.[url];
    if (filedir) {
      /** 当api 文件不存在时 */
      if (!filedir) {
        res.sendStatus(404);
      }
      /** 动态引入最新数据 */
      const datas = decacheRequire(filedir);
      const item = datas?.[url];

      /** 当api 不存在时 */
      if (!item) {
        res.sendStatus(404);
      }

      /** 支持两种写法：对象和回调 */
      if (Object.prototype.toString.call(item) === "[object Function]") {
        item(req, res, next);
      } else {
        res.json(item);
      }
    } else {
      next();
    }
  });

  /** 监听 mock文件夹变动 */
  chokidar
    .watch(path.resolve(__dirname, "./../mock"))
    .on("all", (event, path) => {
      switch (event) {
        case "add":
        case "change":
          registerRouteCallback(path);
          break;
        case "unlink":
          // 删除文件后，清除文件变量
          Object.keys(routerPaths).forEach((key) => {
            if (routerPaths[key] === path) {
              delete routerPaths[key];
            }
          });
          break;
        default:
          break;
      }
      console.log(chalk.green("success"), "Mock files parse success");
    });

  /** 调取文件夹遍历其中的文件，回调注册路由 */
  fileDisplay(path.resolve(__dirname, "./../mock"), (filedir) =>
    registerRouteCallback(filedir)
  );
};

/**
 * 收集mock api 对应的文件地址
 * @param {*} devServer express 服务
 * @param {*} filedir 文件路径
 */
const registerRouteCallback = (filedir) => {
  /** 动态引入最新数据 */
  const data = decacheRequire(filedir);

  /** 数据是否是对象 */
  if (Object.prototype.toString.call(data) === "[object Object]") {
    /** 遍历数据，注册路由 */
    Object.keys(data).map((key) => {
      // 收集mock api
      routerPaths[key] = filedir;
    });
  }
};
