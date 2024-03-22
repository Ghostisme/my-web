import { Space, Button, Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import * as CommonUtil from '@/utils/common';
import ViewBody from './ViewBody';
import { statusList } from './_mock';
import type { ColumnsType } from 'antd/es/table';
import type { ModalProps } from 'antd';
type BtnType = 'create' | 'view' | 'update' | 'del';
type ModalSetting = {
  title: string;
};
export const GetCloumn = (
  isOpen: boolean,
  setModalSetting: Function,
  setIsOpen: Function
) => {
  // 表格操作列事件
  const handleClick = (type: BtnType, row: User.UserInfo) => {
    const defaultSetting: ModalProps = {
      title: '',
      centered: true,
      open: isOpen,
      cancelText: '取消',
      okText: '确定',
    };
    if (type === 'view') {
      defaultSetting.title = '查看用户';
      defaultSetting.children = <ViewBody {...row} />;
    }
    if (type === 'create') {
    }
    setModalSetting(defaultSetting);
    setIsOpen(true);
  };
  return [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text: string, record: User.UserInfo, index) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      render: (text: string, record: User.UserInfo, index) =>
        CommonUtil.formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '更新日期',
      dataIndex: 'update_time',
      render: (text: string, record: User.UserInfo, index) =>
        CommonUtil.formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: (text: string, record: User.UserInfo, index: number) => (
        <span>
          {statusList.map((item) => (item.value === +text ? item.title : ''))}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: User.UserInfo, index: number) => (
        <Space>
          <Tooltip title='查看'>
            <Button
              type='text'
              shape='circle'
              icon={<InfoCircleOutlined />}
              onClick={() => handleClick('view', record)}
            ></Button>
          </Tooltip>
          <Tooltip title='编辑'>
            <Button type='text' shape='circle' icon={<EditOutlined />}></Button>
          </Tooltip>
          <Tooltip title='删除'>
            <Button
              type='text'
              shape='circle'
              icon={<DeleteOutlined />}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ] as ColumnsType<User.UserInfo>;
};
