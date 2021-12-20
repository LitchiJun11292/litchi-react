import React from "react";
import { DatePicker, Button } from "antd";
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, } from "@ant-design/icons";
const AntdTest = () => {
    return (<>
      <h1>AntdTest</h1>
      <div>
        <div className="icons-list">
          <SmileTwoTone />
          <HeartTwoTone twoToneColor="#eb2f96"/>
          <CheckCircleTwoTone twoToneColor="#52c41a"/>
        </div>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </div>
    </>);
};
export default AntdTest;
//# sourceMappingURL=index.jsx.map