import React, { useState, useEffect, Fragment } from "react";
import { Button, Table, Card, Space, Col, Divider } from "antd";
import axios from "axios";
import { API } from "../../api";
import CreateRentBook from "./CreateRentBook";
import { map } from "lodash"

import "./rentBooks.css";

const { Column } = Table;

export function RentBook() {
  const [dataRentBook, setDataRentBook] = useState(null);
  const [student, setStudent] = useState(null);
  const [book, setBook] = useState(null);
  const [rentBook, setRentBook] = useState(null);
  const [showCreateRentBook, setShowCreateRentBook] = useState(false);
  const [reloadData, setReloadData] = useState(true);

  const getStudents = () => {
    axios.get(`${API.url + API.students}`).then((response) => {
      setStudent(response.data)
    });
  }
  const getBooks = () => {
    axios.get(`${API.url + API.books}`).then((response) => {
      setBook(response.data)
    });
  }
  const getRentBook = () => {
    axios.get(`${API.url + API.rentbook}`).then((response) => {
      setRentBook(response.data)
    });
  }

  useEffect(() => {
    if (reloadData === true) {
      getStudents()
      getBooks()
      getRentBook()
      setReloadData(false);
    }
  }, [reloadData]);

  useEffect(() => {
    if (student !== null && rentBook !== null && book !== null) {
      let loop = []
      map(rentBook, (item) => {
        const dataRent = {
          key: item.key,
          student: student.filter(value => value.id === item.studentId)[0],
          book: book.filter(value => value.id === item.bookId)[0],
          rentDate: item.rentDate,
          rentDueDate: item.rentDueDate,
        }
        loop.push(dataRent)
      })
      setDataRentBook(loop)
    }

  }, [student, rentBook, book]);

  const deletePost = (value) => {
    axios.delete(`${API.url + API.rentbook}/${value}`).then(() => {
      setReloadData(true);
    });
  };
  return (
    <div className="rent-books">
      <CreateRentBook
        setReloadData={setReloadData}
        setShowModalRentBook={setShowCreateRentBook}
        showModalRentBook={showCreateRentBook}
        dataStudent={student} dataBook={book}
      />
      <Col span={30}>
        <Card width="100%" title="Rent Book">
          <Space size="middle">
            <Button type="primary" onClick={() => setShowCreateRentBook(true)}>
              Create Rent Book
            </Button>
          </Space>
          <Divider />
          <Table dataSource={dataRentBook} pagination={false}>
            <Column title="Id" dataIndex="key" key="key" />
            <Column title="name student" dataIndex="student" key="student" render={(text) => {
              return (
                <Fragment>{text !== undefined && text.name}</Fragment>
              )
            }} />
            <Column title="name book" dataIndex="book" key="book" render={(text) => {
              return (
                <Fragment>{text !== undefined && text.name}</Fragment>
              )
            }} />
            <Column title="Rent Date" dataIndex="rentDate" key="rentDate" />
            <Column title="Rent Due Date" dataIndex="rentDueDate" key="rentDueDate" />
            <Column
              title="Action"
              render={(text) => {
                return (
                  <Space size="middle">
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
    </div>
  );
}
