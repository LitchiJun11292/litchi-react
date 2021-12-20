let Mock = require("mockjs");

module.exports = {
  "/api/mockTest_2": (req, res) => {
    // 添加跨域请求头
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(
      Mock.mock({
        status: 200,
        msg: "操作成功!",
        "data|1-9": [
          {
            "id|+1": 1,
            "value2|0-500": 20,
            "value7|0-500": 20,
          },
        ],
      })
    );
  },
};
