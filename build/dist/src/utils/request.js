const request = (url, options) => {
    const { params = {}, datas = {}, ...rest } = options;
    switch (options.method) {
        case "GET":
            const paramsStr = new URLSearchParams(params).toString();
            url = paramsStr ? `${url}?${paramsStr}` : url;
            break;
        case "POST":
        case "PUT":
        case "DELETE":
            rest.body = JSON.stringify(datas);
            rest.headers = {
                "content-type": "application/json",
            };
            break;
    }
    return fetch(url, {
        method: "GET",
        ...rest,
    }).then((response) => response.json());
};
/** GET */
export const get = function (url, options) {
    return request(url, { ...options, method: "GET" });
};
/** POST */
export const post = function (url, options) {
    return request(url, { ...options, method: "POST" });
};
/** PUT */
export const put = function (url, options) {
    return request(url, { ...options, method: "PUT" });
};
/** DELETE */
export const del = function (url, options) {
    return request(url, { ...options, method: "DELETE" });
};
//# sourceMappingURL=request.js.map