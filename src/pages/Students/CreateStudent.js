import React from "react";
import { Button, Modal, Form, Input, Space } from "antd";
import axios from "axios";
import { API } from "../../api";

export default function CreateStudent(props) {
  const { setShowModalStudent, showModalStudent, setReloadData } = props;

  const onFinish = (values) => {
    axios
      .post(`${API.url + API.students}`, {
        name: values.name,
        class: values.class,
      })
      .then(() => {
        setReloadData(true);
        setShowModalStudent(false);
      });
  };

  return (
    <Modal
      title="Create Student"
      centered
      visible={showModalStudent}
      onOk={() => setShowModalStudent(false)}
      onCancel={() => setShowModalStudent(false)}
      width={275}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Space>
            Name
            <Input placeholder="Name" />
          </Space>
        </Form.Item>
        <Form.Item
          name="class"
          rules={[
            {
              required: true,
              message: "Please input your Class!",
            },
          ]}
        >
          <Space>
            Class
            <Input placeholder="Class" />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
