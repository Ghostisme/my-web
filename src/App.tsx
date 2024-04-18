import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider } from 'antd';
import { useHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import enUS from 'antd/es/locale/en_US';
import zhCn from 'antd/es/locale/zh_CN';
import { newZhCn, newEnUS } from './utils/local';
import AppRoutes from './routers';
import useUserHook from '@/hooks/useUser';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  const history = useHistory();
  const [locale, setLocale] = useState(newZhCn);
  const useUser = useUserHook();
  const handleClick = () => {
    // console.log(zhCn, "locale");
    if (locale.locale === 'zh-cn') {
      setLocale(newEnUS);
    } else {
      setLocale(newZhCn);
    }
  };
  // useEffect(() => {
  //   if (!useUser.auth.isLogin) {
  //     history.push('/login');
  //   }
  // }, [useUser.auth.isLogin, history]);
  return (
    <ConfigProvider locale={locale}>
      {/* <Button onClick={handleClick}>点击切换</Button> */}
      <Router>
        <AppRoutes {...useUser} />
      </Router>
    </ConfigProvider>
  );
};
export default App;
