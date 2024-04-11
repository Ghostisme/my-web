import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Input, Checkbox, Button, Tabs } from 'antd';
import {
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import useUserHook from '@/hooks/useUser';
import AlertComp from '@/components/AlertComp';
import DefaultRegister from './DefaultRegister';
import MobileRegister from './MobileRegister';
import EmailRegister from './EmailRegister';
import Register from './Register';
import type * as DataType from './data.d';

import './index.less';

export default function index(props: any) {
  const history = useHistory();
  // const { auth, login, logout } = useUserHook();
  const [remember, setRemember] = useState(false);
  const [form] = Form.useForm();
  // 注册登录切换状态值
  const [activeKey, setActiveKey] = useState('register');
  // 已有账号登录
  const handleLogin = () => {
    setActiveKey('login');
  };
  // 注册选择项集合
  const items = [
    {
      label: '普通注册',
      key: 'default',
      value: 'default',
      children: <DefaultRegister handleLogin={handleLogin} />,
    },
    {
      label: '手机号注册',
      key: 'mobile',
      value: 'mobile',
      children: <MobileRegister handleLogin={handleLogin} />,
    },
    // {
    //   label: '邮箱注册',
    //   key: 'email',
    //   value: 'email',
    //   children: <EmailRegister handleLogin={handleLogin} />,
    // },
  ];
  // 立即注册点击
  const handleRegister = () => {
    setActiveKey('register');
  };
  // 登录逻辑
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
        {activeKey === 'register' && (
          <div className='register-form-box'>
            <div className='form-title'>后台注册</div>
            <Tabs items={items} centered />
          </div>
        )}
        {activeKey === 'login' && (
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
                或
                <Button
                  type='link'
                  style={{ padding: '0px' }}
                  onClick={handleRegister}
                >
                  立即注册!
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
      {/* 操作弹窗 */}
      {/* <AlertComp {...{ isOpen, handleOk, handleCancel, ...modelSetting }} /> */}
    </div>
  );
}
