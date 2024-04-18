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
    path: '',
    // exact: true,
    // redirect: '/login',
    component: BlankLayout,
    childRoutes: [
      {
        path: '/login',
        name: '登录页',
        component: lazy(() => import('@/pages/Login')),
      },
      // {
      //   path: '/register',
      //   name: '注册页',
      //   component: lazy(() => import('@/pages/Login/Register')),
      // },
      {
        path: '/',
        component: BasicLayout,
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            icon: <SmileOutlined rev={undefined} />,
            component: lazy(() => import('@/pages/Welcome')),
          },
          {
            path: '/home',
            name: '首页',
            icon: <HomeOutlined rev={undefined} />,
            component: lazy(() => import('@/pages/Home')),
          },
          {
            path: '/articleManagement',
            name: '文章管理',
            icon: <ReadOutlined rev={undefined} />,
            component: lazy(() => import('@/pages/ArticleManagement')),
          },
          {
            path: '/imageManagement',
            component: lazy(() => import('@/pages/ImageManagement')),
            icon: <PictureOutlined rev={undefined} />,
            name: '图片管理',
          },
          {
            path: '/videoManagement',
            component: lazy(() => import('@/pages/VideoManagement')),
            icon: <PlaySquareOutlined rev={undefined} />,
            name: '视频管理',
          },
          {
            path: '/user',
            component: lazy(() => import('@/pages/User')),
            icon: <SettingOutlined rev={undefined} />,
            name: '用户设置',
          },
          {
            path: '/role',
            component: lazy(() => import('@/pages/Role')),
            icon: <SettingOutlined rev={undefined} />,
            name: '角色设置',
          },
          // {
          //   path: "/settings",
          //   component: lazy(() => import("@/pages/Welcome")),
          //   icon: <SmileOutlined />,
          //   name: "项目管理",
          // },
          // {
          //   path: '/set',
          //   component: lazy(() => import('@/pages/Setting')),
          //   icon: <SettingOutlined />,
          //   component: BlankLayout,
          //   component: BasicLayout,
          //   name: '设置',
          //   childRoutes: [
          //     {
          //       path: '/user',
          //       component: lazy(() => import('@/pages/Setting')),
          //       component: lazy(() => import('@/pages/User')),
          //       icon: <SettingOutlined />,
          //       name: '用户设置',
          //     },
          //     {
          //       path: '/role',
          //       component: lazy(() => import('@/pages/Setting')),
          //       component: lazy(() => import('@/pages/Role')),
          //       icon: <SettingOutlined />,
          //       name: '角色设置',
          //     },
          //   ],
          //   children: [
          //     {
          //       path: '/set/user',
          //       component: lazy(() => import('@/pages/Setting')),
          //       component: lazy(() => import('@/pages/User')),
          //       icon: <SettingOutlined />,
          //       name: '用户设置',
          //     },
          //     {
          //       path: '/set/role',
          //       component: lazy(() => import('@/pages/Setting')),
          //       component: lazy(() => import('@/pages/Role')),
          //       icon: <SettingOutlined />,
          //       name: '角色设置',
          //     },
          //   ],
          // },
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
            icon: <FrownOutlined rev={undefined} />,
            component: lazy(() => import('@/pages/ErrorPage')),
          },
        ],
      },
      // {
      //   path: '/',
      //   exact: true,
      //   redirect: '/login',
      // },
      { path: '*', exact: true, redirect: '/exception/404' },
    ],
  },
];

export default routes;
