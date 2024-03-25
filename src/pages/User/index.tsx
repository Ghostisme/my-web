import React, { useEffect, useState } from 'react';
import TableSearch from '@/components/TableSearch';
import TableList from '@/components/TableList';
import AlertComp from '@/components/AlertComp';

import Api from '@/apis';
import { statusList } from './_mock';
import type User from '@/apis/user/index.d';
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

const UserComp: React.FC = () => {
  // 列表数据处理
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<User.UserInfo[]>([]);
  const [error, setError] = useState(null);
  // 列表滑块按钮
  const [switchLoad, setSwitchLoad] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // 弹窗
  const [isOpen, setIsOpen] = useState(false);
  const [modelSetting, setModalSetting] = useState({});
  // 弹窗关闭事件
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
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
        const res = await Api.userList(params);
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
    fetchData();
  }, []);
  useEffect(() => {
    console.log('改变了');
  }, [isChecked]);
  return (
    <div className='container'>
      {/* 查询项 */}
      <TableSearch list={searchList} />
      {/* 表格项 */}
      <TableList
        columns={GetCloumn(
          isOpen,
          switchLoad,
          isChecked,
          setModalSetting,
          setIsOpen,
          setSwitchLoad,
          setIsChecked
        )}
        dataSource={data}
        loading={tableLoading}
      />
      {/* 操作弹窗 */}
      <AlertComp {...{ isOpen, handleOk, handleCancel, ...modelSetting }} />
    </div>
  );
};

export default UserComp;
