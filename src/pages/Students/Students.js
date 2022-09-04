import React, { useState, useEffect } from "react";
import { Button, Table, Card, Row, Space, Col, Divider } from "antd";
import axios from "axios";
import { API } from "../../api";
import CreateStudent from "./CreateStudent";

import "./students.css";
import EditStudent from "./EditStudent";

const { Column } = Table;

export function Students() {
  const [data, setData] = useState(null);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [selectRow, setSelectRow] = useState(false);
  const [reloadData, setReloadData] = useState(true);

  useEffect(() => {
    if (reloadData === true) {
      axios.get(`${API.url + API.students}`).then((response) => {
        setData(response.data);
        setReloadData(false);
      });
    }
  }, [reloadData]);

  const deletePost = (value) => {
    axios.delete(`${API.url + API.students}/${value}`).then(() => {
      setReloadData(true);
    });
  };

  return (
    <div className="students">
      <CreateStudent
        setReloadData={setReloadData}
        setShowModalStudent={setShowCreateStudent}
        showModalStudent={showCreateStudent}
      />
      <EditStudent
        setReloadData={setReloadData}
        setShowModalStudent={setShowEditStudent}
        showModalStudent={showEditStudent}
        selectRow={selectRow}
      />
      <Row>
        <Col span={24}>
          <Card width="100%" title="Students">
            <Space size="middle">
              <Button type="primary" onClick={() => setShowCreateStudent(true)}>
                Create Student
              </Button>
            </Space>
            <Divider />
            <Table dataSource={data} pagination={false}>
              <Column title="Id" dataIndex="key" key="key" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Class" dataIndex="class" key="class" />
              <Column
                title="Action"
                render={(text) => {
                  return (
                    <Space size="middle">
                      <Button
                        onClick={() =>
                          setShowEditStudent(true) & setSelectRow(text)
                        }
                      >
                        Edit
                      </Button>
                      <Button onClick={() => deletePost(text.key)}>
                        Delete
                      </Button>
                    </Space>
                  );
                }}
              />
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
