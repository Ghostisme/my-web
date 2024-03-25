import React from 'react';
import { Card, Table, Button } from 'antd';
import { TableProps } from 'antd/es/table';
import './index.less';

function TableList(
  props: JSX.IntrinsicAttributes &
    TableProps<any> & { children?: React.ReactNode } & {
      ref?: React.Ref<HTMLDivElement> | undefined;
      isShow?: boolean;
    }
) {
  return (
    <Card className='card-table'>
      {props.isShow && (
        <div className='btn-body'>
          <Button>新增</Button>
        </div>
      )}
      <Table className='table-container' {...props}></Table>
    </Card>
  );
}

export default TableList;
