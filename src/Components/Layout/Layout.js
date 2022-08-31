import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import "./layout.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function MainLayout(props) {
  const { children } = props;
  const theme = "light";

  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [
    {
      key: "student",
      icon: <UserOutlined />,
      label: <Link to="/students">Student</Link>,
    },
    {
      key: "book",
      icon: <BookOutlined />,
      label: <Link to="/books">Books</Link>,
    },
    {
      key: "rent",
      icon: <ShoppingOutlined />,
      label: <Link to="/rent">Rent Book</Link>,
    },
  ];
  return (
    <Layout className="layout">
      <Sider
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        collapsedWidth={0}
        width={200}
      >
        <Menu items={menuItems}></Menu>
      </Sider>
      <Layout>
        <Header theme={theme} className="header">
          <div className="logo" />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
