import React from "react";
import { Column, Gauge, Pie } from "@ant-design/plots";

function ChartComp(props: any) {
  const GetChart = (props: { name: string }) => {
    if (props.name === "Column") {
      const data = [
        {
          type: "家具家电",
          sales: 38,
        },
        {
          type: "粮油副食",
          sales: 52,
        },
        {
          type: "生鲜水果",
          sales: 61,
        },
        {
          type: "美容洗护",
          sales: 145,
        },
        {
          type: "母婴用品",
          sales: 48,
        },
        {
          type: "进口食品",
          sales: 38,
        },
        {
          type: "食品饮料",
          sales: 38,
        },
        {
          type: "家庭清洁",
          sales: 38,
        },
      ];
      const config = {
        data,
        xField: "type",
        yField: "sales",
        label: {
          // 可手动配置 label 数据标签位置
          position: "middle",
          // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: "#FFFFFF",
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: "类别",
          },
          sales: {
            alias: "销售额",
          },
        },
      };
      return <Column {...config} />;
    } else if (props.name === "Pie") {
      const data = [
        {
          type: "分类一",
          value: 27,
        },
        {
          type: "分类二",
          value: 25,
        },
        {
          type: "分类三",
          value: 18,
        },
        {
          type: "分类四",
          value: 15,
        },
        {
          type: "分类五",
          value: 10,
        },
        {
          type: "其他",
          value: 5,
        },
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
          type: "inner",
          offset: "-30%",
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: "center",
          },
        },
        interactions: [
          {
            type: "element-active",
          },
        ],
      };
      return <Pie {...config} />;
    } else if (props.name === "Gauge") {
      const config = {
        percent: 0.75,
        range: {
          color: "#30BF78",
        },
        indicator: {
          pointer: {
            style: {
              stroke: "#D0D0D0",
            },
          },
          pin: {
            style: {
              stroke: "#D0D0D0",
            },
          },
        },
        axis: {
          label: {
            formatter(v) {
              return Number(v) * 100;
            },
          },
          subTickLine: {
            count: 3,
          },
        },
        statistic: {
          content: {
            formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
            style: {
              color: "rgba(0,0,0,0.65)",
              fontSize: 48,
            },
          },
        },
      };
      return <Gauge {...config} />;
    }
    return <Column data={[]} xField={""} yField={""} />;
  };
  return <GetChart {...props} />;
}

export default ChartComp;
