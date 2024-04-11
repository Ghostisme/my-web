import React, { useState } from 'react';
import { Tabs, Segmented, Space } from 'antd';
import DefaultRegister from './DefaultRegister';
import MobileRegister from './MobileRegister';
import EmailRegister from './EmailRegister';
import type * as DataType from './data.d';

const Register = (props: DataType.ModalPropsType) => {
  const [activeKey, setActiveKey] = useState('default');
  const items = [
    {
      label: '普通注册',
      key: 'default',
      value: 'default',
      children: <DefaultRegister />,
    },
    {
      label: '手机号注册',
      key: 'mobile',
      value: 'mobile',
      children: <MobileRegister />,
    },
    {
      label: '邮箱注册',
      key: 'email',
      value: 'email',
      children: <EmailRegister />,
    },
  ];
  const getItem = (key: string) => {
    return items.filter((item) => item.key === key)[0];
  };
  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };
  const leftSliderBars = [
    {
      label: '普通注册',
      key: 'default',
    },
    {
      label: '手机号注册',
      key: 'mobile',
    },
    {
      label: '邮箱注册',
      key: 'email',
    },
  ];
  return (
    <div className='register-container'>
      {/* 顶部 */}
      <div className='header-container'></div>
      {/* 快捷栏 */}
      {/* <Tabs tabPosition='left' centered items={items} /> */}
      <Space className='left-slider' direction='vertical' size={100}>
        {items.map((item) => (
          <div className='slider-container'>
            <div
              className={
                activeKey === item.key ? 'slider-title active' : 'slider-title'
              }
              onClick={() => handleTabClick(item.key)}
            >
              {item.label}
            </div>
          </div>
        ))}
      </Space>
      <div className='tab-container'>{getItem(activeKey).children}</div>
    </div>
  );
};

export default Register;
