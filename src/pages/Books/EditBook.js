import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space } from "antd";
import axios from "axios";
import { API } from "../../api";

export default function EditBook(props) {
  const { setShowModalBook, showModalBook, selectRow, setReloadData } = props;

  const [book, setBook] = useState();

  useEffect(() => {
    if (selectRow !== undefined) {
      setBook(selectRow);
    }
  }, [selectRow, book]);

  const onFinish = (values) => {
    axios
      .put(`${API.url + API.books}/${selectRow.key}`, {
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
      title="Edit Book"
      centered
      visible={showModalBook}
      onOk={() => setShowModalBook(false)}
      onCancel={() => setShowModalBook(false)}
      width={275}
    >
      {book && (
        <Form onFinish={onFinish}>
          <Form.Item name="name">
            <Space>
              Name
              <Input placeholder="Name" defaultValue={book.name} />
            </Space>
          </Form.Item>

          <Form.Item name="year">
            <Space>
              Year
              <Input placeholder="Year" defaultValue={book.year} />
            </Space>
          </Form.Item>

          <Form.Item name="desc">
            <Space>
            Desc
              <Input placeholder="Desc" defaultValue={book.desc} />
            </Space>
          </Form.Item>

          <Form.Item name="img">
            <Space>
            Img
              <Input placeholder="Img" defaultValue={book.img} />
            </Space>
          </Form.Item>

          <Form.Item name="author">
            <Space>
            Author
              <Input placeholder="Author" defaultValue={book.author} />
            </Space>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
