import React from 'react';
import { Form, Input, Radio } from 'antd';
import type * as DataType from './data.d';

const CreateBody = (props: DataType.ModalPropsType) => {
  return (
    <div className='modal-body'>
      <Form
        form={props.form}
        initialValues={{ name: '', is_admin: 1, status: 1 }}
        labelCol={{ span: 5 }}
        labelAlign='right'
      >
        <Form.Item label='角色姓名' name='name'>
          <Input placeholder='请输入角色名称'></Input>
        </Form.Item>
        <Form.Item label='是否是管理员' name='is_admin'>
          <Radio.Group>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='是否禁用' name='status'>
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBody;
