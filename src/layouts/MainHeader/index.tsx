import React from 'react';
import { Layout, Row, Col, Dropdown, Menu } from 'antd';
import { SmileOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.less';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <SmileOutlined />
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='1'>
      <Link to='/login'>
        <LogoutOutlined />
        退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

function MainHeader() {
  return (
    <Header className='main-header'>
      <Row justify='end' className='header-row'>
        <Col>
          <Dropdown
            overlay={menu}
            trigger={['click', 'hover']}
            placement='bottom'
          >
            <div className='user-info'>
              <span className='user-img' />
              <span className='user-name'>
                {/* {globalStore.userInfo.loginName} */}
                Rich
              </span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}

export default MainHeader;
