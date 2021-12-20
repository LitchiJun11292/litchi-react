import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Hello</h1>
      <Button
        type="primary"
        onClick={() => {
          navigate("/ReduxTest");
        }}
      >
        跳转redux
      </Button>
    </>
  );
}

export default Welcome;
