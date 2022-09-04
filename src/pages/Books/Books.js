import React, { useState, useEffect } from "react";
import { Button, Table, Card, Row, Space, Col, Divider } from "antd";
import axios from "axios";
import { API } from "../../api";
import CreateBook from "./CreateBook";

import "./books.css";
import EditBook from "./EditBook";

const { Column } = Table;

export function Books() {
  const [data, setData] = useState(null);
  const [showCreateBook, setShowCreateBook] = useState(false);
  const [showEditBook, setShowEditBook] = useState(false);
  const [selectRow, setSelectRow] = useState(false);
  const [reloadData, setReloadData] = useState(true);

  useEffect(() => {
    if (reloadData === true) {
      axios.get(`${API.url + API.books}`).then((response) => {
        setData(response.data);
        setReloadData(false);
      });
    }
  }, [reloadData]);

  const deletePost = (value) => {
    axios.delete(`${API.url + API.books}/${value}`).then(() => {
      setReloadData(true);
    });
  };

  return (
    <div className="books">
      <CreateBook
        setReloadData={setReloadData}
        setShowModalBook={setShowCreateBook}
        showModalBook={showCreateBook}
      />
      <EditBook
        setReloadData={setReloadData}
        setShowModalBook={setShowEditBook}
        showModalBook={showEditBook}
        selectRow={selectRow}
      />
      <Row>
        <Col span={30}>
          <Card width="100%" title="Books">
            <Space size="middle">
              <Button type="primary" onClick={() => setShowCreateBook(true)}>
                Create Book
              </Button>
            </Space>
            <Divider />
            <Table dataSource={data} pagination={false}>
              <Column title="Id" dataIndex="key" key="key" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Year" dataIndex="year" key="year" />
              <Column title="Desc" dataIndex="desc" key="desc" />
              <Column title="Img" dataIndex="img" key="img" />
              <Column title="Author" dataIndex="author" key="author" />
              <Column
                title="Action"
                render={(text) => {
                  return (
                    <Space size="middle">
                      <Button
                        onClick={() =>
                          setShowEditBook(true) & setSelectRow(text)
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
