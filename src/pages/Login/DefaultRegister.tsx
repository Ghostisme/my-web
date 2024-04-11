import React from 'react';
import { Form, Input, Button } from 'antd';

const DefaultRegister = (props: any) => {
  const [form] = Form.useForm();
  return (
    <Form
      className='register-form'
      form={form}
      labelCol={{ span: 6 }}
      initialValues={{
        username: '',
        password: '',
        code: '',
      }}
    >
      <Form.Item
        label='用户名'
        name='username'
        rules={[{ required: true, message: '用户名必填!' }]}
      >
        <Input placeholder='用户名' className='username-input' />
      </Form.Item>
      <Form.Item
        label='密码'
        name='password'
        rules={[{ required: true, message: '密码必填!' }]}
      >
        <Input.Password placeholder='密码' />
      </Form.Item>
      <Form.Item
        label='确认密码'
        name='password'
        rules={[{ required: true, message: '密码必填!' }]}
      >
        <Input.Password placeholder='确认密码' />
      </Form.Item>
      {/* <Form.Item
        label='验证码'
        name='code'
        rules={[{ required: true, message: '验证码必填!' }]}
      >
        <Input placeholder='验证码' />
      </Form.Item> */}
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          注册
        </Button>
        或
        <Button
          type='link'
          style={{ padding: '0px' }}
          onClick={props.handleLogin}
        >
          立即登录!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DefaultRegister;
