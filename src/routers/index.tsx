import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import routes from './modules/basic';
import LoadingPage from '@/components/LoadingPage';
import useUserHook from '@/hooks/useUser';

const renderRoutes = (routes: any[], props: any) => {
  // console.log(`output->routes`, routes);
  // const [renderChildRoutes, setRenderChildRoutes] = useState([])
  if (!Array.isArray(routes)) {
    return null;
  }
  return (
    <Switch>
      {routes.map((route, index) => {
        // console.log(route, "路由配置文件");
        // console.log(route.redirect, "route.redirect");
        if (route.redirect) {
          // console.log('进来了', route);
          const redurect = (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
              {...props}
            />
          );
          // console.log(redurect, "redurect");
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
              {...props}
            />
          );
        }
        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={() => {
              console.log(route.childRoutes, 'route.childRoutes');
              // if (route.childRoutes && route.childRoutes.length !== 0) {
              //   renderRoutes(route.childRoutes, props);
              // }
              const renderChildRoutes = renderRoutes(route.childRoutes, props);
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    <route.component route={route} {...props}>
                      {renderChildRoutes}
                    </route.component>
                  </Suspense>
                );
              }
              // return renderRoutes(route.childRoutes, props);
              return renderChildRoutes;
            }}
          ></Route>
        );
      })}
    </Switch>
  );
};
// console.log(renderRoutes(routes), "renderRoutes(routes)");
const AppRoutes = (props: any) => {
  // console.log(props, 'AppRoutes');
  const history = useHistory();
  // const location = useLocation();
  const { auth, login, logout } = useUserHook();
  // useEffect(() => {
  //   if (!auth.isLogin) {
  //     history.push('/login');
  //   }
  // }, [auth.isLogin, history]);
  return <Router>{renderRoutes(routes, props)}</Router>;
};
export default AppRoutes;
