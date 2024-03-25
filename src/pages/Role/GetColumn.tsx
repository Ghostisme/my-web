import { Space, Button, Tooltip, Popconfirm, Switch } from 'antd';
import {
  InfoCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import * as CommonUtil from '@/utils/common';
import ViewBody from './ViewBody';
import UpdateBody from './UpdateBody';
import { statusList } from './_mock';
import type { ColumnsType } from 'antd/es/table';
import type * as DataType from './data.d';
export const GetCloumn = (
  isOpen: boolean,
  switchLoad: boolean,
  isChecked: boolean,
  setModalSetting: Function,
  setIsOpen: Function,
  setSwitchLoad: Function,
  setIsChecked: Function
) => {
  // 表格操作列事件
  const handleClick = (type: DataType.BtnType, row: Role.RoleInfo) => {
    const defaultSetting: DataType.ModalSetting = {
      title: '',
      centered: true,
      open: isOpen,
      cancelText: '取消',
      okText: '确定',
      type,
    };
    if (type === 'view') {
      defaultSetting.title = '查看角色';
      defaultSetting.children = (
        <ViewBody {...{ row, option: defaultSetting }} />
      );
    }
    if (type === 'update') {
      defaultSetting.title = '编辑用户';
      defaultSetting.children = (
        <UpdateBody {...{ row, option: defaultSetting }} />
      );
    }
    if (type === 'create') {
    }
    setModalSetting(defaultSetting);
    setIsOpen(true);
  };
  // 表格改变用户状态事件
  const handleChange = (checked: boolean, row: Role.RoleInfo) => {
    setSwitchLoad(true);
    console.log(checked, '=====');
    // row.status = +checked;
    setIsChecked(checked);
    setSwitchLoad(false);
  };
  return [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text: string, record: Role.RoleInfo, index) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: '角色名称',
      dataIndex: 'role_name',
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      render: (text: string, record: Role.RoleInfo, index) =>
        CommonUtil.formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '更新日期',
      dataIndex: 'update_time',
      render: (text: string, record: Role.RoleInfo, index) =>
        CommonUtil.formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作人',
      dataIndex: 'action_id',
    },
    {
      title: '操作日期',
      dataIndex: 'action_time',
      render: (text: string, record: Role.RoleInfo, index) =>
        CommonUtil.formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      render: (text: string, record: Role.RoleInfo, index: number) => {
        setIsChecked(+text);
        return (
          <Switch
            checkedChildren={statusList.map((item) =>
              item.value === +text ? item.title : ''
            )}
            unCheckedChildren={statusList.map((item) =>
              item.value === +text ? item.title : ''
            )}
            checked={isChecked}
            loading={switchLoad}
            onChange={(val) => handleChange(val, record)}
          />
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Role.RoleInfo, index: number) => (
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
            <Button
              type='text'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => handleClick('update', record)}
            ></Button>
          </Tooltip>
          <Popconfirm title='你确定要删除此条数据？'>
            <Button
              type='text'
              shape='circle'
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ] as ColumnsType<Role.RoleInfo>;
};
