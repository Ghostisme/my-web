import React, { useState } from 'react';
import { Form, Input, Button, Modal, notification, Tooltip } from 'antd';
import { useCountDown } from '@/hooks/useCountDown';
import Api from '@/apis';
import AlertComp from '@/components/AlertComp';
import { InfoCircleOutlined } from '@ant-design/icons';

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

    if (!flag) {
      if (form.getFieldValue('mobile') === '') {
        form.setFields([
          {
            name: 'mobile',
            value: '',
            errors: ['手机号不能为空！'],
            touched: true,
            validating: true,
          },
        ]);
      } else {
        if (form.getFieldValue('mobile').length === 11) {
          const params = {
            mobile: form.getFieldValue('mobile'),
          };
          const res = await Api.getCode(params);
          console.log(res, '获取验证码');
          if (res) {
            start();
            setTimeout(() => {
              setMsgCode(res.code);
              setOpen(true);
            }, 3000);
          }
        } else {
          form.setFields([
            {
              name: 'mobile',
              value: '',
              errors: ['手机号必须11位！'],
              touched: true,
              validating: true,
            },
          ]);
        }
      }
    }
  };
  const handleSubmit = async (values: { mobile: string; code: string }) => {
    const params = {
      type: false,
      ...values,
    };
    const res = await Api.register(params);
    console.log(res, '手机号注册');
    if (!res) {
      notification.success({
        message: '注册成功!',
        closeIcon: false,
      });
      setTimeout(() => {
        props.setActiveKey('login');
      }, 3000);
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
        onFinish={handleSubmit}
      >
        <Form.Item label=''>
          <Form.Item
            name='mobile'
            rules={[{ required: true, message: '手机号必填!' }]}
          >
            <Input placeholder='手机号' className='username-input' />
            <Tooltip title='手机号注册会默认成为用户名，密码默认为123456初始密码，注册成功请尽快更改密码'>
              <InfoCircleOutlined rev={undefined} />
            </Tooltip>
          </Form.Item>
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
