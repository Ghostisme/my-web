import React, { useContext } from "react";
import { Card, Col, Form, Row, Input, Select, DatePicker, Button } from "antd";
import { newZhCn, newEnUS } from "@/utils/local";
import type { Props, StatusList } from "./data.d";
import "./index.less";

const { Option } = Select;
const { RangePicker } = DatePicker;

const getItem = (item: { type: string; optionsList?: StatusList[] }) => {
  // const configContext = useContext(ConfigContext);
  // console.log(configContext.getPrefixCls(), "configContext");
  if (item.type === "input") {
    return <Input {...item} />;
  } else if (item.type === "select") {
    return (
      <Select {...item}>
        {item.optionsList?.map(
          (
            it: {
              value: any;
              title:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            },
            index: number
          ) => (
            <Option key={index} value={it.value}>
              {it.title}
            </Option>
          )
        )}
      </Select>
    );
  } else if (item.type === "dateTime") {
    return <RangePicker className="date-picker" format={"YYYY/MM/DD"} />;
  }
};

const TableSearch: React.FC<Props> = (props) => {
  // console.log(props, "tableSearch");
  return (
    <Card className="card-search">
      <Form>
        <Row gutter={24}>
          {props?.list.map((item, index) => (
            <Col key={index} span={24 / (props.list.length + 1)}>
              <Form.Item className="search-item" key={index}>
                {getItem(item)}
              </Form.Item>
            </Col>
          ))}
          <Col span={6}>
            <Button type="primary" htmlType="submit">
              {newZhCn.other.searchSubmit}
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                // form.resetFields();
              }}
            >
              {newZhCn.other.searchReset}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TableSearch;
