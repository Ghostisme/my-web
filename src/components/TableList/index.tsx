import React from "react";
import { Card, Table } from "antd";
import { TableProps } from "antd/es/table";
import "./index.less";

function TableList(
  props: JSX.IntrinsicAttributes &
    TableProps<any> & { children?: React.ReactNode } & {
      ref?: React.Ref<HTMLDivElement> | undefined;
    }
) {
  return (
    <Card className="card-table">
      <Table className="table-container" {...props}></Table>
    </Card>
  );
}

export default TableList;
