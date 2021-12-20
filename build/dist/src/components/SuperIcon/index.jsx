/**
 * React中优雅的使用icon
 * 参考地址：https://blog.csdn.net/weixin_39605455/article/details/111135369
 */
import React from "react";
import classnames from "classnames";
import "./index.css";
const scriptElem = document.createElement("script");
scriptElem.src = "//at.alicdn.com/t/font_2922683_3xa30dt4dke.js";
document.body.appendChild(scriptElem);
const SuperIcon = ({ className, type, ...restProps }) => {
    return (<svg className={classnames("super-icon", className)} ria-hidden="true" {...restProps}>
      <use xlinkHref={`#${type}`}/>
    </svg>);
};
export default SuperIcon;
//# sourceMappingURL=index.jsx.map