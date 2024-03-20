import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import {
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import useUserHook from '@/hooks/useUser';
import './index.less';
import { useHistory } from 'react-router';

export default function index(props: any) {
  const history = useHistory();
  // const { auth, login, logout } = useUserHook();
  const [remember, setRemember] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const localLoginInfo = JSON.parse(
      localStorage.getItem('loginInfo') || '{}'
    );
    localLoginInfo.remember && form.setFieldsValue(localLoginInfo);
  }, [remember, form]);
  useEffect(() => {
    console.log(props.auth, 'auth');
    if (props.auth.isLogin) {
      // 登录过
      history.push('/welcome');
    }
  }, [props.auth]);
  const handleFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const params = {
      ...values,
    };
    setRemember(values.remember);
    if (values.remember) {
      // 记住账号
      localStorage.setItem('loginInfo', JSON.stringify(values));
    } else {
      localStorage.removeItem('loginInfo');
    }
    const res = await props.login(params);
    console.log(res, '测试登录接口');
    if (res) {
      // props.setAuth({
      //   isLogin: true,
      //   admin: res.user.role.role === 'admin',
      //   username: res.user.username,
      //   role: res.user.role.role,
      // });
      // console.log(props.auth, 'auth');
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
          <Form className='login-form' form={form} onFinish={handleFinish}>
            <Form.Item
              label=''
              name='username'
              rules={[{ required: true, message: '请输入用户名或手机号!' }]}
            >
              <Input
                placeholder='Enter your username'
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>
            <Form.Item
              label=''
              name='password'
              rules={[{ required: true, message: '请输入密码!' }]}
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
