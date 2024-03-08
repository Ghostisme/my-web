import React, { useEffect, useState } from "react";
import { Space, Button, Tooltip } from "antd";
import {
  InfoCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { DataType } from "./data.d";
import TableSearch from "@/components/TableSearch";
import TableList from "@/components/TableList";
import { statusList } from "./_mock";
import "./index.less";

const columns: ColumnsType<DataType> = [
  {
    title: "序号",
    dataIndex: "index",
    render: (text: string, record: DataType, index) => <span>{index + 1}</span>,
  },
  {
    title: "文章名称",
    dataIndex: "name",
  },
  {
    title: "创建日期",
    dataIndex: "createTime",
  },
  {
    title: "更新日期",
    dataIndex: "updateTime",
  },
  {
    title: "文章状态",
    dataIndex: "status",
    render: (text: string, record: DataType, index: number) => (
      <span>
        {statusList.map((item) => (item.value === +text ? item.title : ""))}
      </span>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: (text: string, record: DataType, index: number) => (
      <Space>
        <Tooltip>
          <Button
            type="text"
            shape="circle"
            icon={<InfoCircleOutlined />}
          ></Button>
        </Tooltip>
        <Tooltip>
          <Button type="text" shape="circle" icon={<EditOutlined />}></Button>
        </Tooltip>
        <Tooltip>
          <Button type="text" shape="circle" icon={<DeleteOutlined />}></Button>
        </Tooltip>
      </Space>
    ),
  },
];

const searchList = [
  {
    name: "keyWord",
    type: "input",
    placeholder: "请输入关键词",
    allowClear: true,
  },
  {
    name: "status",
    type: "select",
    placeholder: "请选择状态",
    allowClear: true,
    optionsList: statusList,
  },
  {
    name: "createTime",
    type: "dateTime",
  },
];

const ArticleManagement: React.FC = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    let arr: React.SetStateAction<DataType[]> = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        key: i,
        id: i,
        name: `文章${i + 1}`,
        createTime: "2022-01-01 13:13:13",
        updateTime: "2022-01-01 13:13:13",
        status: 1,
        link: "",
      });
    }
    setTableLoading(true);
    setTimeout(() => {
      setData(arr);
      setTableLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="container">
      {/* 查询项 */}
      <TableSearch list={searchList} />
      {/* 表格项 */}
      <TableList columns={columns} dataSource={data} loading={tableLoading} />
    </div>
  );
};

export default ArticleManagement;
