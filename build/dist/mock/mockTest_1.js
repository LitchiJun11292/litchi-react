"use strict";
let Mock = require("mockjs");
module.exports = {
    "/api/mockTest_1": Mock.mock({
        status: 200,
        msg: "操作成功!",
        data: {
            "data|1-9": [
                {
                    "name|1": ["AMD", "CMD", "UMD"],
                    "age|0-80": 20,
                    "address|1": ["AMD", "CMD", "UMD"],
                },
            ],
            total: 90,
            current: 1,
            pageSize: 10,
        },
    }),
};
//# sourceMappingURL=mockTest_1.js.map