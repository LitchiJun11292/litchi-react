const { merge } = require("webpack-merge");
const { get } = require("lodash");
const config = require("../config/config");
const version = require("./../package.json").version; //添加版本号

/** 合并配置 */
const configCommon = merge(
  {
    history: {
      type: "history", // hash | history
    },
  },
  config
);

/** 路由模式 */
const historyType = get(configCommon, "history.type", "history");
/** 是否为 history模式 */
const isHistory = historyType === "history";

module.exports = {
  configCommon,
  historyType,
  isHistory,
  version,
};
