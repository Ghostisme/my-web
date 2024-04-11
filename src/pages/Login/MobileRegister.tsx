import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { useCountDown } from '@/hooks/useCountDown';
import Api from '@/apis';
import AlertComp from '@/components/AlertComp';

const MobileRegister = (props: any) => {
  const [form] = Form.useForm();
  const [codeMsg, setCodeMsg] = useState('获取验证码');
  const { start, count, isdisable } = useCountDown(
    60,
    () => {
      setCodeMsg(`${count}s后重新获取`);
    },
    () => {
      setCodeMsg('获取验证码');
    }
  );
  const handleClick = async (flag: boolean) => {
    // flag 为false则获取验证码
    if (!flag) {
      const params = {
        mobile: '15202270460',
      };
      const res = await Api.getCode(params);
      console.log(res, '获取验证码');
      start();
    }
  };
  return (
    <>
      <Form
        className='register-form'
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          mobile: '',
          code: '',
        }}
      >
        <Form.Item
          label=''
          name='mobile'
          rules={[{ required: true, message: '手机号必填!' }]}
        >
          <Input placeholder='手机号' className='username-input' />
        </Form.Item>
        <Form.Item
          label=''
          name='code'
          rules={[{ required: true, message: '验证码必填!' }]}
        >
          <div className='code-box'>
            <Input placeholder='验证码' className='username-input' />
            <Button
              className='code-btn'
              disabled={isdisable}
              onClick={() => handleClick(isdisable)}
            >
              {codeMsg}
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
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
      <Modal></Modal>
    </>
  );
};

export default MobileRegister;
