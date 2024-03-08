import React from "react";
import { Spin } from "antd";
import "./index.less";

export default function LoadingPage() {
  const imgUrl = new URL("../../assets/images/loading.gif", import.meta.url)
    .href;
  const loadingIcon = <img src={imgUrl} alt="" className="loading-image" />;
  return (
    <div className="loading-container">
      <div className="">{loadingIcon}</div>
      {/* <Spin size="large" indicator={loadingIcon}></Spin> */}
    </div>
  );
}
