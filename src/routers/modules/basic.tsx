import React, { lazy } from 'react';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  FormOutlined,
  UserOutlined,
  StarOutlined,
  PictureOutlined,
  ReadOutlined,
  PlaySquareOutlined,
  SettingOutlined,
  WarningOutlined,
  FrownOutlined,
} from '@ant-design/icons';

import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

const routes = [
  {
    path: '/',
    // exact: true,
    // redirect: "/welcome",
    component: BlankLayout,
    childRoutes: [
      {
        path: '/login',
        name: '登录页',
        component: lazy(() => import('@/pages/Login')),
      },
      {
        path: '/index',
        component: BasicLayout,
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            icon: <SmileOutlined />,
            component: lazy(() => import('@/pages/Welcome')),
          },
          {
            path: '/home',
            name: '首页',
            icon: <HomeOutlined />,
            component: lazy(() => import('@/pages/Home')),
          },
          {
            path: '/articleManagement',
            name: '文章管理',
            icon: <ReadOutlined />,
            component: lazy(() => import('@/pages/ArticleManagement')),
          },
          {
            path: '/imageManagement',
            component: lazy(() => import('@/pages/ImageManagement')),
            icon: <PictureOutlined />,
            name: '图片管理',
          },
          {
            path: '/videoManagement',
            component: lazy(() => import('@/pages/VideoManagement')),
            icon: <PlaySquareOutlined />,
            name: '视频管理',
          },
          // {
          //   path: "/settings",
          //   component: lazy(() => import("@/pages/Welcome")),
          //   icon: <SmileOutlined />,
          //   name: "项目管理",
          // },
          {
            path: '/setting',
            component: lazy(() => import('@/pages/Setting')),
            icon: <SettingOutlined />,
            name: '设置',
          },
        ],
      },
      {
        path: '/exception',
        name: '异常页',
        icon: WarningOutlined,
        childRoutes: [
          {
            path: '/exception/404',
            name: '404',
            exact: true,
            icon: <FrownOutlined />,
            component: lazy(() => import('@/pages/ErrorPage')),
          },
        ],
      },
      {
        path: '/',
        exact: true,
        redirect: '/login',
      },
      // { path: '*', exact: true, redirect: '/' },
    ],
  },
];

export default routes;
