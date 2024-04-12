import React, { useState } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import { useCountDown } from '@/hooks/useCountDown';
import Api from '@/apis';
import AlertComp from '@/components/AlertComp';

const MobileRegister = (props: any) => {
  const [form] = Form.useForm();
  const [codeMsg, setCodeMsg] = useState('获取验证码');
  const [open, setOpen] = useState(false);
  const [msgCode, setMsgCode] = useState('');
  const { start, count, isdisable } = useCountDown(
    60,
    () => {
      setCodeMsg(`${count}s后重新获取`);
    },
    () => {
      setCodeMsg('获取验证码');
      setMsgCode('');
      setOpen(false);
    }
  );
  const handleClick = async (flag: boolean) => {
    // flag 为false则获取验证码
    if (form.getFieldValue('mobile') === '') {
      // notification.error(Object.assign({}, '', { closeIcon: false }));
      // form
      //   .validateFields()
      //   .then((values) => {
      //     console.log(values, '为false则获取验证码');
      //   })
      //   .catch((errInfo) => {
      //     console.log(errInfo, '====');
      //   });
    }
    if (!flag) {
      const params = {
        mobile: '15202270460',
      };
      const res = await Api.getCode(params);
      console.log(res, '获取验证码');
      if (res) {
        start();
        setMsgCode(res.code);
        setOpen(true);
      }
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
      <Modal
        title=''
        centered
        closable={false}
        width={300}
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <div className='code-msg'>
          【RichSystem】验证码
          <span style={{ color: '#40a9ff' }}>{msgCode}</span>
          ，您正在用Rich的后台系统，如非本人操作，请联系Rich本人。请勿在任何短信或邮件链接的页面中输入验证码！
        </div>
      </Modal>
    </>
  );
};

export default MobileRegister;
