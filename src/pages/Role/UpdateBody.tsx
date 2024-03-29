import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import type * as DataType from './data.d';
const UpdateBody = (props: DataType.ModalPropsType) => {
  console.log(props, 'ViewBody');
  // const [initialValues, setInitialValues] = useState({});
  const [inputVal, setVal] = useState('');
  useEffect(() => {
    // setInitialValues({
    //   id: props.row.id,
    //   status: props.row.status,
    //   name: inputVal
    // });
    setVal(props.row.role_name);
    // props.form.setFields([
    //   {
    //     name: 'id',
    //     validating: false,
    //     touched: false,
    //     value: props.row.id,
    //   },
    //   {
    //     name: 'status',
    //     validating: false,
    //     touched: false,
    //     value: props.row.status,
    //   },
    // ]);
    // props.form.setFieldValue('id', props.row.id);
    // props.form.setFieldValue('name', props.row.role_name);
    // props.form.setFieldValue('status', props.row.status);
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    props.setNewForm &&
      props.setNewForm({
        id: props.row.id,
        status: props.row.status,
        name: e.target.value,
      });
  };
  return (
    <div className='modal-body'>
      <span>角色名称</span>
      <Input value={inputVal} onChange={handleChange}></Input>
      {/* <Form name='update' form={props.form} initialValues={initialValues}>
        <Form.Item label='角色姓名' name='name'>
          <Input></Input>
        </Form.Item>
      </Form> */}
    </div>
  );
};

export default UpdateBody;
