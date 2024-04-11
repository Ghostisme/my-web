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
    props.row && setVal(props.row.role_name);
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    props.setNewForm &&
      props.row &&
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
