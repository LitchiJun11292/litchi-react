import React from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import asyncRouter from "@/utils/asyncRouter";
import route from "../config/route";
import Redirect from "@/utils/redirectRouter";
import "./global.less";

const Router = {
  hash: HashRouter,
  history: BrowserRouter,
}[HISTORYTYPE] as React.FC<any>;

// 处理配置化路由
const callDeep = (arr: any) => {
  // arr 不是数组且没有长度，则返回 null
  if (!(Array.isArray(arr) && !!arr?.length)) {
    return null;
  }

  return arr?.map(({ component, routes, redirect, ...rest }, index) => {
    // 定义重定向
    if (redirect) {
      return <Route key={index} index element={<Redirect to={redirect} />} />;
    }

    const child = callDeep(routes);
    const Page = rest.isAsync !== false ? asyncRouter(component) : component;
    // let Page = asyncRouter(component);
    return (
      <Route key={index} {...rest} element={<Page />}>
        {child}
      </Route>
    );
  });
};

const App: React.FC = () => {
  const loading = useSelector((state: any) => state.loading.loadingAll);
  return (
    <Spin spinning={loading} size="large">
      <div style={{ height: "100vh" }}>
        <Router>
          <Routes>{callDeep(route)}</Routes>
        </Router>
      </div>
    </Spin>
  );
};

export default App;
