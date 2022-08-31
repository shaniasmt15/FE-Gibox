import React, { Fragment, useState } from "react";
import { Row, Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, BookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login() {
  const navigate = useNavigate();
  const [isShowAlert, showAlert] = useState(false);

  const onFinish = (values) => {
    const { username, password } = values;

    console.log("Received values of form: ", username, password);
    if (username === "admin" && password === "123456") {
      localStorage.setItem("token", "token_access");
      return navigate("/books");
    } else showAlert(true);
  };

  const RenderAlert = () => {
    setTimeout(() => {
      showAlert(false);
    }, 1500);
    return (
      <div className="alert">
        <Alert
          message="Username and Password not Match!"
          type="error"
          closable
          onClose={() => showAlert(false)}
          showIcon
        />
      </div>
    );
  };

  return (
    <div className="login">
      {isShowAlert && <RenderAlert />}
      <Row type="flex" justify="center" align="middle" className="login-row">
        <Card
          title={
            <Fragment>
              <BookOutlined />
              <span> Rent Book</span>
            </Fragment>
          }
        >
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
}
