import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space } from "antd";
import axios from "axios";
import { API } from "../../api";

export default function EditStudent(props) {
  const { setShowModalStudent, showModalStudent, selectRow, setReloadData } =
    props;

  const [student, setStudent] = useState();

  useEffect(() => {
    if (selectRow !== undefined) {
      setStudent(selectRow);
    }
  }, [selectRow, student]);

  const onFinish = (values) => {
    axios
      .put(`${API.url + API.students}/${selectRow.key}`, {
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
      title="Edit Student"
      centered
      visible={showModalStudent}
      onOk={() => setShowModalStudent(false)}
      onCancel={() => setShowModalStudent(false)}
      width={275}
    >
      {student && (
        <Form onFinish={onFinish}>
          <Form.Item name="name">
            <Space>
              Name
              <Input placeholder="Name" defaultValue={student.name} />
            </Space>
          </Form.Item>
          <Form.Item name="class">
            <Space>
              Class
              <Input placeholder="Class" defaultValue={student.class} />
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
