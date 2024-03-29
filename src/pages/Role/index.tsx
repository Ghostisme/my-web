import React, { useEffect, useState } from 'react';
import { Form, notification } from 'antd';
import TableSearch from '@/components/TableSearch';
import TableList from '@/components/TableList';
import AlertComp from '@/components/AlertComp';

import Api from '@/apis';
import { statusList } from './_mock';
import type Role from '@/apis/role/index.d';
import './index.less';
import { GetCloumn } from './GetColumn';
const searchList = [
  {
    name: 'keyWord',
    type: 'input',
    placeholder: '请输入关键词',
    allowClear: true,
  },
  {
    name: 'status',
    type: 'select',
    placeholder: '请选择状态',
    allowClear: true,
    optionsList: statusList,
  },
  {
    name: 'createTime',
    type: 'dateTime',
  },
];
const RoleComp = () => {
  // 是否是新增点击
  // const [isCreate, setIsCreate] = useState(false)
  // 列表数据处理
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<Role.RoleInfo[]>([]);
  const [error, setError] = useState(null);
  // 列表滑块按钮
  const [switchLoad, setSwitchLoad] = useState(false);
  // 弹窗
  const [isOpen, setIsOpen] = useState(false);
  const [modelSetting, setModalSetting] = useState({});
  // 弹窗表单
  const [form] = Form.useForm();
  const [newForm, setNewForm] = useState(
    {} as {
      id: number;
      status: number;
      name: string;
    }
  );
  // 弹窗关闭事件
  const handleOk = async () => {
    // console.log(form.getFieldsValue());
    try {
      const res = await Api.updateRole(newForm);
      if (!res) {
        notification.success({
          message: '更新成功',
          closeIcon: false,
        });
        setIsOpen(false);
        fetchData();
      }
    } catch (error) {
      setIsOpen(false);
    }
  };
  const handleCancel = () => {
    setNewForm(
      {} as {
        id: number;
        status: number;
        name: string;
      }
    );
    setIsOpen(false);
  };
  const fetchData = async () => {
    setTableLoading(true);
    const params = {
      // beginTime: '',
      // endTime: '',
      // keyWord: '',
      // status: null,
      page: 1,
      pageSize: 10,
    };

    try {
      const res = await Api.roleList(params);
      if (res) {
        console.log(res, '用户列表数据');
        setData(res.list);
        setTableLoading(false);
      }
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setTableLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // 列表滑块切换操作
  const handleChange = async (checked: boolean, row: Role.RoleInfo) => {
    setSwitchLoad(true);
    try {
      const params = {
        id: row.id,
        name: row.role_name,
        status: +checked,
      };
      const res = await Api.updateRole(params);
      if (!res) {
        fetchData();
      }
      setSwitchLoad(false);
    } catch (error) {
      setSwitchLoad(false);
    }
  };
  // 新增点击
  const handleClick = () => {
    setModalSetting({
      title: '新增角色',
      centered: true,
      open: isOpen,
      cancelText: '取消',
      okText: '确定',
      type,
    });
  };
  return (
    <div className='container'>
      {/* 查询项 */}
      <TableSearch list={searchList} />
      {/* 表格项 */}
      <TableList
        columns={GetCloumn(
          isOpen,
          switchLoad,
          setModalSetting,
          setIsOpen,
          handleChange,
          form,
          newForm,
          setNewForm
        )}
        dataSource={data}
        loading={tableLoading}
        isShow
        handleClick={handleClick}
      />
      {/* 操作弹窗 */}
      <AlertComp {...{ isOpen, handleOk, handleCancel, ...modelSetting }} />
      {/* 新增弹窗 */}
      {/* <AlertComp /> */}
    </div>
  );
};

export default RoleComp;
