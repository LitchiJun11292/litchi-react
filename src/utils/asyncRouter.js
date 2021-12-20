/**
 * 动态加载组件
 */
import React, { Suspense } from "react";

export default (loaderRouter) => {
  const Page = React.lazy(loaderRouter);
  return (props) => {
    return (
      <Suspense fallback={"loading..."}>
        <Page {...props}></Page>
      </Suspense>
    );
  };
};
