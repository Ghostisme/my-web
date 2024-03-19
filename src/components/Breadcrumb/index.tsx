import React, { ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { Route, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import * as Type from './data.d';
import './index.less';

const BreadcrumbComp: React.FC<Type.Props> = (props: {
  routes: { childRoutes: any };
  children?: ReactNode;
}) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const BreadcrumbItems = pathSnippets.map((item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const currentRoute = props.routes.childRoutes.find(
      (it: {
        path: {
          includes: (arg0: string) => { (): any; new (): any; name: any };
        };
      }) => it.path.includes(url)
    );
    if (currentRoute) {
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{currentRoute.name}</Link>
        </Breadcrumb.Item>
      );
    } else {
      return <></>;
    }
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/home'>首页</Link>
    </Breadcrumb.Item>,
  ].concat(BreadcrumbItems);
  return <Breadcrumb className='nav-box'>{breadcrumbItems}</Breadcrumb>;
};

export default BreadcrumbComp;
