import {
  Space,
  Button,
  Tooltip,
  Popconfirm,
  Switch,
  type FormInstance,
} from 'antd';
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
  setModalSetting: Function,
  setIsOpen: Function,
  handleChange: Function,
  newForm: {
    id: number;
    status: number;
    name: string;
  },
  setNewForm: Function,
  handleDelClick: Function
) => {
  // 表格操作列事件
  const handleClick = (type: DataType.BtnType, row: User.UserInfo) => {
    const defaultSetting: DataType.ModalSetting = {
      title: '',
      centered: true,
      open: isOpen,
      cancelText: '取消',
      okText: '确定',
      type,
    };
    if (type === 'view') {
      defaultSetting.title = '查看用户';
      defaultSetting.children = (
        <ViewBody {...{ row, option: defaultSetting }} />
      );
      setModalSetting(defaultSetting);
      setIsOpen(true);
    }
    if (type === 'update') {
      defaultSetting.title = '编辑用户';
      defaultSetting.children = (
        <UpdateBody {...{ row, option: defaultSetting, newForm, setNewForm }} />
      );
      setModalSetting(defaultSetting);
      setIsOpen(true);
    }
    if (type === 'del') {
      defaultSetting.title = '删除用户';
      handleDelClick(row);
    }
  };
  // 表格改变用户状态事件
  // const handleChange = (checked: boolean, row: Role.RoleInfo) => {
  //   setSwitchLoad(true);
  //   console.log(checked, '=====');
  //   // row.status = +checked;
  //   setIsChecked(checked);
  //   setSwitchLoad(false);
  // };
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
      title: '地区',
      dataIndex: 'addr',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      // render: (text: string, record: User.UserInfo, index) =>
      //   CommonUtil.formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
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
      render: (text: string, record: User.UserInfo, index: number) => {
        // handleChange(+text, record);
        return (
          <Switch
            checkedChildren={statusList.map((item) =>
              item.value === +text ? item.title : ''
            )}
            unCheckedChildren={statusList.map((item) =>
              item.value === +text ? item.title : ''
            )}
            checked={+text === 1}
            loading={switchLoad}
            onChange={(val) => handleChange(val, record)}
          />
        );
      },
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
            <Button
              type='text'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => handleClick('update', record)}
            ></Button>
          </Tooltip>
          <Popconfirm
            title='你确定要删除此条数据？'
            onConfirm={() => handleClick('del', record)}
          >
            <Button
              type='text'
              shape='circle'
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ] as ColumnsType<User.UserInfo>;
};
