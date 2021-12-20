const fs = require("fs");
const path = require("path");
const decache = require("decache");
const { version } = require("./defaultConfig");
/** 保存当前this */
const _this = this;

/**
 * 导出版本号
 */
exports.version = version;

/**
 * 运行 npm run build:version，指定版本号打包，否则 hash
 * @param {*} str: string
 * @returns string
 */
exports.generateName = (str) => {
  if (process.env.npm_config_isVersion) {
    return version + "/" + str.replace(/(\[hash:8]\.)|(\[chunkhash:8]\.)/, "");
  }
  return str;
};

/**
 * 清除require缓存，并引入数据
 * @param {*} filedir 全路径
 * @returns
 */
exports.decacheRequire = (filedir) => {
  /**
   * 清除 require缓存
   * 直接 require.cache 清除不彻底：https://zhuanlan.zhihu.com/p/34702356
   */
  try {
    decache(filedir);
    // delete require.cache[require.resolve(filedir)];
  } catch (error) {
    //todo...
  }
  return require(filedir);
};

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param callBack 处理文件回调
 */
exports.fileDisplay = (filePath, callBack) => {
  /** 根据文件路径读取文件，返回文件列表 */
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      /** 遍历读取到的文件列表 */
      files.forEach(function (filename) {
        /** 获取当前文件的绝对路径 */
        var filedir = path.join(filePath, filename);
        /** 根据文件路径获取文件信息，返回一个fs.Stats对象 */
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn("获取文件stats失败");
          } else {
            /** 是文件 */
            var isFile = stats.isFile();
            /** 是文件夹 */
            var isDir = stats.isDirectory();
            if (isFile) {
              /** 调取回调 */
              callBack(filedir);
            }
            if (isDir) {
              /** 递归，如果是文件夹，就继续遍历该文件夹下面的文件 */
              _this.fileDisplay(filedir, callBack);
            }
          }
        });
      });
    }
  });
};
