import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "@/models";
import App from "./app";
// import "es6-symbol";
/** 开启热跟新 */
if (module.hot) {
    module.hot.accept("./app", function () {
        /** 卸载 root 下的渲染 */
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
        ReactDOM.render(<Provider store={store}>
        <App />
      </Provider>, document.getElementById("root"));
    });
}
/** 也可以什么都不写 */
// if (module.hot) {
//   module.hot.accept();
// }
ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById("root"));
//# sourceMappingURL=index.js.map