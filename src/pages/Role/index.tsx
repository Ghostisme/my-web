import React, { useEffect, useState } from 'react';
import { Form, notification } from 'antd';
import TableSearch from '@/components/TableSearch';
import TableList from '@/components/TableList';
import AlertComp from '@/components/AlertComp';
import CreateBody from './CreateBody';
import Api from '@/apis';
import { statusList } from './_mock';
import { GetCloumn } from './GetColumn';
import type ApiType from '@/apis/role/index.d';
import type Role from '@/apis/role/index.d';
import type * as DataType from './data.d';
import './index.less';
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
  // 查询选项处理
  const [search, setSearchForm] = useState({
    beginTime: '',
    endTime: '',
    keyWord: '',
    status: undefined,
    page: 1,
    pageSize: 10,
  });
  const [searchForm] = Form.useForm();
  // 查询
  const onSearch = () => {
    console.log(searchForm.getFieldsValue(), 'searchForm.getFieldsValue()');

    const res = {} as ApiType.RoleListParams;
    // Object.assign(res, search, searchForm.getFieldsValue())
    // setSearchForm(res)
  };
  // 重置
  const onReset = () => {};
  // 列表数据处理
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<Role.RoleInfo[]>([]);
  const [error, setError] = useState(null);
  // 列表滑块按钮
  const [switchLoad, setSwitchLoad] = useState(false);
  // 弹窗
  const [isOpen, setIsOpen] = useState(false);
  const [modelSetting, setModalSetting] = useState<DataType.ModalSetting>(
    {} as DataType.ModalSetting
  );
  // 弹窗表单（编辑，查看）
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
    if (modelSetting.type !== 'create') {
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
    } else {
      // 新增
      const params = form.getFieldsValue();
      const res = await Api.createRole(params);
      if (!res) {
        setIsOpen(false);
        notification.success({
          message: '创建成功',
          closeIcon: false,
        });
        fetchData();
      }
      // form.validateFields().then((res) => {

      // })
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
    try {
      const res = await Api.roleList(search);
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
    const defaultSetting: DataType.ModalSetting = {
      title: '',
      centered: true,
      open: isOpen,
      cancelText: '取消',
      okText: '确定',
      type: 'create',
    };
    defaultSetting.title = '新增角色';
    defaultSetting.children = (
      <CreateBody {...{ option: defaultSetting, newForm, setNewForm, form }} />
    );
    setModalSetting(defaultSetting);
    setIsOpen(true);
  };
  // 删除点击执行接口
  const handleDelClick = async (row: Role.RoleInfo) => {
    const params = {
      id: row.id,
    };
    const res = await Api.delRole(params);
    console.log(res, '===');
    if (!res) {
      fetchData();
    }
  };
  return (
    <div className='container'>
      {/* 查询项 */}
      <TableSearch
        list={searchList}
        search={searchForm}
        onSearch={onSearch}
        onReset={onReset}
      />
      {/* 表格项 */}
      <TableList
        columns={GetCloumn(
          isOpen,
          switchLoad,
          setModalSetting,
          setIsOpen,
          handleChange,
          newForm,
          setNewForm,
          handleDelClick
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
