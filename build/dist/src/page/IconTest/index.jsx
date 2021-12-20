import React from "react";
import SuperIcon from "@/components/SuperIcon";
function IconTest() {
    return (<h1>
      <i className="iconfont icon-lipin"></i>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-lipin"></use>
      </svg>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-zhanghu"></use>
      </svg>
      <SuperIcon className="icon-lipintest" type="icon-lipin"/>
      <div style={{ fontFamily: "s102-bd" }}>0000</div>
    </h1>);
}
export default IconTest;
//# sourceMappingURL=index.jsx.map