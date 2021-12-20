import React from "react";
import { Image } from "antd";
import style from "./index.less";
import testImport1 from "./333.jpg";
import testImport2 from "@static/images/777.jpeg";

interface WelcomeInter {
  name: string;
}

const ImageTest: React.FC<WelcomeInter> = () => {
  console.log(J);

  return (
    <>
      <h1>ImageTest</h1>
      <Image width={200} src={testImport1} />
      <Image width={200} src={testImport2} />
      <Image width={200} src="/images/777.jpeg" />
      <Image width={200} src={require("./333.jpg")} />
      <Image width={200} src="./333.jpg" />
      <h1>CssModuleTest</h1>
      <div className={style["test-h"]} style={{ background: "green" }}>
        <span className="uuuu">88888</span>
        test
      </div>
    </>
  );
};

export default ImageTest;
