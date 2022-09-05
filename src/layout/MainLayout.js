import React, {  useEffect, useState } from "react";
import { Layout, Menu, Badge, Popover, Alert } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./layout.css";

const { Header, Sider, Content } = Layout;
const setToken = (value) => {
  localStorage.setItem("token", value);
  return;
};

export default function MainLayout(props) {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "students",
      icon: (
        <Link to="/students">
          <UserOutlined />
        </Link>
      ),
      label: "Students",
    },
    {
      key: "books",
      icon: (
        <Link to="/books">
          <BookOutlined />
        </Link>
      ),
      label: "Books",
    },
    {
      key: "rent_book",
      icon: (
        <Link to="/rent_book">
          <ShoppingOutlined />
        </Link>
      ),
      label: "Rent Book",
    },
  ];

  const onLogout = () => {
    setToken("");
    navigate("/login");
  };

  useEffect(() => { }, [location]);

  const ContentNotifications = () => {
    return (
      <Alert
        message="Rendra"
        description="Pengembalian buku telat 3 hari total denda Rp 15.000.-"
        type="info"
      />
    )
  }

  return (
    <Layout className="layout">
      <Layout>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          collapsedWidth={0}
          width={200}
          zeroWidthTriggerStyle={{
            top: "10px",
          }}
        >
          {collapsed === false && (
            <div className="logo">
              <BookOutlined />
              <span> Rent Book</span>
            </div>
          )}

          <Menu
            selectedKeys={[location.pathname.slice(1)]}
            items={menuItems}
          ></Menu>
        </Sider>
        <Layout>
          <Header>
            <div className="header-rigt">
              <div className="header-rigt-item" onClick={() => onLogout()}>
                <LogoutOutlined /> <span className="text">Logout</span>
              </div>
              <div className="header-rigt-item">
                <Popover
                  placement="bottomRight"
                  title="notifications"
                  content={<ContentNotifications />}
                  trigger="click"
                >
                  <Badge count={1} size="small">
                    <BellOutlined />
                  </Badge>
                </Popover>
              </div>
            </div>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}