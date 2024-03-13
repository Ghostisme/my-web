import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import {
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import useUserHook from '@/hooks/useUser';
import './index.less';
import { useHistory } from 'react-router';

export default function index() {
  const history = useHistory();
  const UserHooks = useUserHook();
  const handleFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const params = {
      ...values,
    };
    if (values.remember) {
      // 记住账号
      localStorage.setItem('loginInfo', values);
    }
    const res = await UserHooks.login(params);
    console.log(res, '测试登录接口');
    if (res) {
      // 登录成功
      // history.push('/welcome');
    }
  };
  return (
    <div className='login-container'>
      <div className='login-body'>
        <div className='login-describe'>
          {/* <div className='describe-img'></div> */}
          <div className='describe-title'>谦虚·低调·进取</div>
          <div className='describe-content'>welcome to my home space</div>
        </div>
        <div className='login-form-box'>
          <div className='form-title'>后台登录</div>
          <Form className='login-form' onFinish={handleFinish}>
            <Form.Item
              label=''
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                placeholder='Enter your username'
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>
            <Form.Item
              label=''
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Enter your password'
              />
            </Form.Item>
            <Form.Item>
              <div className='login-remember'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>记住账号</Checkbox>
                </Form.Item>

                <a className='login-form-forgot' href=''>
                  忘记密码
                </a>
                {/* <div>忘记密码</div> */}
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                立即登录
              </Button>
              或<a href=''>立即注册!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
