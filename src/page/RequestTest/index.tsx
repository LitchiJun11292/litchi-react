import React, { useState, useEffect } from "react";
import { Card, Table, Space, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { get } from "@/utils/request";

interface rowInter {
  name: string;
  age: number;
  address: string;
}
interface paramsIter {
  current: number;
  pageSize?: number;
}

interface dataIter extends paramsIter {
  data: rowInter[];
}

const columns: ColumnsType<rowInter> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => {
      return <a>{text}</a>;
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const RequestTest: React.FC = () => {
  const [data, setData] = useState<dataIter>({} as dataIter);

  const { data: cpData = [], ...rest } = data;

  useEffect(() => {
    searchAPI();
  }, []);

  const searchAPI = (params?: paramsIter) => {
    const { current = 1, pageSize = 10 } = params || {};
    get("/api/mockTest_1", { params: { current, pageSize } })
      .then((data) => {
        const { status, data: cData } = data;
        if (status === 200) {
          setData(cData);
        }
      })
      .catch(() => {
        message.error("请求失败");
        // console.log(err?.message, "err");
      });
  };

  return (
    <div>
      <Space size={16} direction="vertical" style={{ width: "100%" }}>
        <Card title="发送请求">
          <Table
            columns={columns}
            dataSource={cpData}
            pagination={{
              ...rest,
              onChange: (page, pageSize) =>
                searchAPI({ current: page, pageSize }),
            }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default RequestTest;
