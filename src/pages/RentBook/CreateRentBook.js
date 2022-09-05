import React from "react";
import { Modal, DatePicker, Select, Form, Button } from "antd";
import axios from "axios";
import { API } from "../../api";
import { map } from "lodash"
const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

export default function CreateBook(props) {
  const { setShowModalRentBook, showModalRentBook, setReloadData, dataStudent, dataBook } = props;


  const onFinish = (values) => {
    const rangeValue = values['range-picker'];

    axios
      .post(`${API.url + API.rentbook}`, {
        rentDate: rangeValue[0].format('YYYY-MM-DD'),
        rentDueDate: rangeValue[1].format('YYYY-MM-DD'),
        studentId: values.student,
        bookId: values.book,
      })
      .then(() => {
        setReloadData(true);
        setShowModalRentBook(false);
      });
  };

  return (
    <Modal
      title="Create Rent Book"
      centered
      visible={showModalRentBook}
      onOk={() => setShowModalRentBook(false)}
      onCancel={() => setShowModalRentBook(false)}
      width={500}

    >

      <Form
        onFinish={onFinish}
      ><Form.Item name="student" label="Student">
          <Select>
            {map(dataStudent, (item, index) => (
              <Select.Option key={index} value={item.key}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="book" label="Book">
          <Select>
            {map(dataBook, (item, index) => (
              <Select.Option key={index} value={item.key}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
          <RangePicker format='YYYY-MM-DD' />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
}


// import { Button, message, Steps, Modal,DatePicker } from 'antd';
// import React, { useState } from 'react';
// const { RangePicker } = DatePicker;
// const { Step } = Steps;
// const steps = [
//   {
//     title: 'Select Student',
//     content: 'First-content',
//   },
//   {
//     title: 'Select Book',
//     content: 'Second-content',
//   },
//   {
//     title: 'Rant Date',
//     content: 'Last-content',
//   },
// ];

// export default function CreateBook(props) {
//   const { setShowModalRentBook, showModalRentBook, setReloadData, dataStudent, dataBook } = props;
//   const [current, setCurrent] = useState(0);

//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

//   return (
//     <Modal
//       title="Create Rent Book"
//       centered
//       visible={showModalRentBook}
//       onOk={() => setShowModalRentBook(false)}
//       onCancel={() => setShowModalRentBook(false)}
//       width={600}

//     >
//       <Steps current={current}>
//         {steps.map((item) => (
//           <Step key={item.title} title={item.title} />
//         ))}
//       </Steps>
//       <div className="steps-content">{steps[current].content}</div>
//       <div className="steps-action">
//         {current < steps.length - 1 && (
//           <Button type="primary" onClick={() => next()}>
//             Next
//           </Button>
//         )}
//         {current === steps.length - 1 && (
//           <Button type="primary" onClick={() => message.success('Processing complete!')}>
//             Done
//           </Button>
//         )}
//         {current > 0 && (
//           <Button
//             style={{
//               margin: '0 8px',
//             }}
//             onClick={() => prev()}
//           >
//             Previous
//           </Button>
//         )}
//       </div>
//     </Modal>
//   );
// };