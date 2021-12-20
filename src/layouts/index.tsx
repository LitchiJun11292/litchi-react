import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu } from "antd";
import { setLoadingFalse } from "@/models/loading";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import route from "../../config/route";
import VersionTag from "@/components/VersionTag";

const { Header, Sider, Content } = Layout;

const Layouts: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setLoadingFalse());
  }, []);

  useEffect(() => {
    setSelectedKeys([location?.pathname]);
  }, [location?.pathname]);

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <VersionTag />
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
        >
          {route?.[0]?.routes
            ?.filter((it) => it?.component)
            ?.map(({ path, title }) => {
              return (
                <Menu.Item key={`/${path}`} icon={<UserOutlined />}>
                  <Link to={`/${path}`}>{title}</Link>
                </Menu.Item>
              );
            })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
