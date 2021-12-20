import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Space } from "antd";
import { decrement, increment, fetchPosts, fetchUsers, addNewPost, } from "@/models/counter";
const ReduxTest = () => {
    const count = useSelector((state) => state.counter.value);
    const status = useSelector((state) => state.counter.status);
    const posts = useSelector((state) => state.counter.posts);
    const dispatch = useDispatch();
    // const store = useStore();
    // console.log(store);
    // console.log(store.getState());
    return (<div>
      <Space size={16} direction="vertical" style={{ width: "100%" }}>
        <Card title="派发事件">
          <div>{count}</div>
          <div>{count}</div>
          <Space>
            <Button type="primary" onClick={() => dispatch(increment())}>
              加+1
            </Button>
            <Button type="primary" onClick={() => dispatch(decrement())}>
              减-1
            </Button>
            <Button type="primary" onClick={() => dispatch({
            type: "counter/incrementByAmount",
            payload: 100,
        })}>
              加+100
            </Button>
          </Space>
        </Card>
        <Card title="异步加载数据（thunk）">
          <div>{status}</div>
          <Space>
            <Button type="primary" onClick={() => dispatch(fetchPosts())}>
              替换单个值
            </Button>
            <Button type="primary" onClick={() => dispatch(fetchUsers())}>
              替换整个值
            </Button>
          </Space>
        </Card>
        <Card title="用的thunk发送数据">
          <div>{posts}</div>
          <Button type="primary" onClick={() => dispatch(addNewPost("发送成功"))}>
            发送
          </Button>
        </Card>
      </Space>
    </div>);
};
export default ReduxTest;
//# sourceMappingURL=index.jsx.map