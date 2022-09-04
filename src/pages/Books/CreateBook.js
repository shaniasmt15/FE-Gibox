import React from "react";
import { Button, Modal, Form, Input, Space } from "antd";
import axios from "axios";
import { API } from "../../api";

export default function CreateBook(props) {
  const { setShowModalBook, showModalBook, setReloadData } = props;

  const onFinish = (values) => {
    axios
      .post(`${API.url + API.books}`, {
        name: values.name,
        year: values.year,
        desc: values.desc,
        img: values.img,
        author: values.author,
      })
      .then(() => {
        setReloadData(true);
        setShowModalBook(false);
      });
  };

  return (
    <Modal
      title="Create Book"
      centered
      visible={showModalBook}
      onOk={() => setShowModalBook(false)}
      onCancel={() => setShowModalBook(false)}
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
          name="year"
          rules={[
            {
              required: true,
              message: "Please input your year!",
            },
          ]}
        >
          <Space>
            Year
            <Input placeholder="Year" />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>
        
        <Form.Item
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input your desc!",
            },
          ]}
        >
          <Space>
            Desc
            <Input placeholder="Desc" />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>

        <Form.Item
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your img!",
            },
          ]}
        >
          <Space>
            Img
            <Input placeholder="Img" />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>

        <Form.Item
          name="author"
          rules={[
            {
              required: true,
              message: "Please input your author!",
            },
          ]}
        >
          <Space>
            Author
            <Input placeholder="Author" />
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
