import React from 'react';
import { Layout } from 'antd';
import MainFooter from '../MainFooter';
import MainHeader from '../MainHeader';
import SiderMenu from '../SiderMenu';
import Breadcrumb from '@/components/Breadcrumb';
import './index.less';

// export default function index() {
//   return <div>index</div>;
// }

const { Content } = Layout;

const BasicLayout = (props: {
  route: { childRoutes: any };
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  // console.log('BasicLayout', props);
  return (
    <Layout className='container-layout'>
      <SiderMenu routes={props.route.childRoutes}></SiderMenu>
      <Layout className='main-layout'>
        <MainHeader {...props}></MainHeader>
        <Content className='main'>
          <Breadcrumb routes={props.route}></Breadcrumb>
          <div className='main-container'>{props?.children}</div>
          {/* <MainFooter></MainFooter> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
