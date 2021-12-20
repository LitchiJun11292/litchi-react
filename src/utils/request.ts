/**
 * fetch 工具封装
 */
interface paramsInter extends RequestInit {
  params?: any;
}
interface datasInter extends RequestInit {
  datas?: any;
}
interface optionsInter extends paramsInter, datasInter {}

const request = (url: string, options: optionsInter) => {
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
export const get: (url: string, options?: paramsInter) => Promise<any> =
  function (url, options) {
    return request(url, { ...options, method: "GET" });
  };

/** POST */
export const post: (url: string, options?: datasInter) => Promise<any> =
  function (url, options) {
    return request(url, { ...options, method: "POST" });
  };

/** PUT */
export const put: (url: string, options?: datasInter) => Promise<any> =
  function (url, options) {
    return request(url, { ...options, method: "PUT" });
  };

/** DELETE */
export const del: (url: string, options?: datasInter) => Promise<any> =
  function (url, options) {
    return request(url, { ...options, method: "DELETE" });
  };
