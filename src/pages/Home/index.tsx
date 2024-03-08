import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Row, Col, Card, Avatar, Typography } from "antd";
import FlipClock from "@/components/FlipClock";
import ChartComp from "@/components/ChartComp";
import "./index.less";

const { Title } = Typography;

// 获取userInfo
const getUserInfo = () => {};
// 处理userImage
const getUserImage = () => {
  // vite的别名需要单独处理成URL形式才可以访问到资源
  const imgUrl = new URL(
    "../../assets/images/avatar_image.jpg",
    import.meta.url
  );
  return <img src={`${imgUrl}`}></img>;
};

function Home() {
  const [colSpan, setColSpan] = useState(6);
  // useEffect(() => {}, []);
  const getColNum = () => {
    setInterval(() => {
      const colNum = Math.floor(Math.random() * 10);
      // console.log(colNum, "colNum");
      setColSpan(24 / colNum);
    }, 5000);
  };

  return (
    <div className="container">
      <Row gutter={24}>
        <Col span={12}>
          <Card hoverable className="card-container">
            <div className="avatar-container">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={getUserImage()}
                className="avatar"
              ></Avatar>
              <Title>谦虚的工具人~</Title>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable className="card-container">
            <FlipClock />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={14}>
          <Card hoverable className="card-container">
            <ChartComp name="Column" />
          </Card>
        </Col>
        <Col span={10}>
          <Card hoverable className="card-container">
            <ChartComp name="Pie" />
          </Card>
        </Col>
        <Col span={24}>
          <Card hoverable className="card-container">
            <ChartComp name="Gauge" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
