import React, { useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Dropdown,
  Menu,
  type MenuProps,
  MenuInfo,
} from 'antd';
import { SmileOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './index.less';

const { Header } = Layout;
/**
 *
 */
const menus: MenuProps['items'] = [
  {
    label: '个人信息',
    key: 1,
    icon: <SmileOutlined />,
  },
  {
    label: '退出登录',
    key: 2,
    icon: <LogoutOutlined />,
  },
];
// const menu = (
//   <Menu>
//     <Menu.Item key='0'>
//       <SmileOutlined />
//       个人信息
//     </Menu.Item>
//     <Menu.Divider />
//     <Menu.Item key='1'>
//       <Link to='/login'>
//         <LogoutOutlined />
//         退出登录
//       </Link>
//     </Menu.Item>
//   </Menu>
// );
const handleMenuClick = async (e: MenuInfo, props: any, history: any) => {
  console.log(e, 'handleMenuClick', props);

  if (e.key === '2') {
    const res = await props.logout();
    if (!res) {
      history.replace('/login');
    }
  }
};

function MainHeader(props: any) {
  const history = useHistory();
  console.log(props, 'MainHeader');
  // useEffect(() => {
  //   console.log(props.auth, 'props.auth');
  // }, [props.auth.isLogin]);
  return (
    <Header className='main-header'>
      <Row justify='end' className='header-row'>
        <Col>
          <Dropdown
            menu={{
              items: menus,
              onClick: (e) => handleMenuClick(e, props, history),
            }}
            trigger={['click', 'hover']}
            placement='bottom'
          >
            <div className='user-info'>
              <span className='user-img' />
              <span className='user-name'>
                {/* {globalStore.userInfo.loginName} */}
                {props.auth.username}
              </span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}

export default MainHeader;
