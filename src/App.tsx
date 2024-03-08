import React, { useState } from "react";
import { Button, ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCn from "antd/es/locale/zh_CN";
import { newZhCn, newEnUS } from "./utils/local";
import AppRoutes from "./routers";
import "antd/dist/antd.css";

const App: React.FC = () => {
  const [locale, setLocale] = useState(newEnUS);
  const handleClick = () => {
    // console.log(zhCn, "locale");
    if (locale.locale === "zh-cn") {
      setLocale(newEnUS);
    } else {
      setLocale(newZhCn);
    }
  };
  return (
    <ConfigProvider locale={locale}>
      {/* <Button onClick={handleClick}>点击切换</Button> */}
      <AppRoutes />
    </ConfigProvider>
  );
};
export default App;
