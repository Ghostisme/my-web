import React from 'react';
import { Form, Input } from 'antd';
import type * as DataType from './data.d';
const UpdateBody = (props: DataType.ModalPropsType) => {
  console.log(props, 'ViewBody');
  return (
    <div className='modal-body'>
      <Form name='update'>
        <Form.Item label='用户姓名'>
          <Input value={props.row.username}></Input>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateBody;
