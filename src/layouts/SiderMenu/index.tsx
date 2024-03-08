import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Row } from "antd";
import { RocketTwoTone } from "@ant-design/icons";
import "./index.less";
import { appStores } from "@/stores";

const { Sider } = Layout;

const renderMenuItem = (items: any[]) =>
  items
    .filter((item: { path: any; name: any }) => item.path && item.name)
    .map(
      (item: {
        children: any[];
        path: string;
        icon: any;
        name: {} | null | undefined;
      }) => {
        if (
          item.children &&
          !!item.children.find(
            (child: { path: string; name: string }) => child.path && child.name
          )
        ) {
          return (
            <Menu.SubMenu
              key={item.path}
              title={
                <div>
                  {!!item.icon && item.icon}
                  <span>{item.name}</span>
                </div>
              }
            >
              {renderMenuItem(item.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <span>
                {!!item.icon && item.icon}
                <span>{item.name}</span>
              </span>
            </Link>
          </Menu.Item>
        );
      }
    );

export default function SiderMenu(props: any) {
  const { pathname } = useLocation();
  const { globalStore } = appStores();
  // console.log(appStores(), "======");
  // 普通state定义数组会出现不能将any[]赋值给never[]型 需要加类型断言 useState([])(为错误的)
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const list = pathname.split("/").splice(1);
    setOpenKeys(
      list.map((_item, index) => `/${list.slice(0, index + 1).join("/")}`)
    );
    setCollapsed(globalStore.collapsed);
  }, []);

  const getSelectedKeys = useMemo(() => {
    const list = pathname.split("/").splice(1);
    return list.map((_item, index) => `/${list.slice(0, index + 1).join("/")}`);
  }, [pathname]);

  // const onOpenChange = (keys: React.SetStateAction<never[]>) => {
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="main-left-slider"
    >
      <Link to="/">
        <Row justify="start" align="middle" className="main-logo">
          {/* <Icon type="car" style={{ color: '#13e367' }} /> */}
          <div className="slider-logo">
            <RocketTwoTone twoToneColor="#13e367" />
            {!collapsed && (
              <span className="app-name">{globalStore.appTitle}</span>
            )}
          </div>
        </Row>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingLeft: 0, marginBottom: 0 }}
        className="main-menu"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={getSelectedKeys}
      >
        {renderMenuItem(props.routes)}
      </Menu>
    </Sider>
    // <Sider
    //   collapsible
    //   collapsed={collapsed}
    //   onCollapse={(value) => setCollapsed(value)}
    // >
    //   <div className="logo">Logo</div>
    //   {/* <img src="@/assets/images/loading.gif" alt="" srcSet="" /> */}
    //   {/* <img src="../../assets/images/loading.gif" alt="" srcSet="" /> */}
    //   <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
    //     {renderMenuItem(props?.routes)}
    //   </Menu>
    // </Sider>
  );
}
