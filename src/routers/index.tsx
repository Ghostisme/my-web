import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import routes from './modules/basic';
import LoadingPage from '@/components/LoadingPage';

const renderRoutes = (routes: any[]) => {
  console.log(`output->routes`, routes);
  if (!Array.isArray(routes)) {
    return null;
  }
  return (
    <Switch>
      {routes.map((route, index) => {
        // console.log(route, "路由配置文件");
        // console.log(route.redirect, "route.redirect");
        if (route.redirect) {
          console.log('进来了', route);
          const redurect = (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
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
              const renderChildRoutes = renderRoutes(route.childRoutes);
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    <route.component route={route}>
                      {renderChildRoutes}
                    </route.component>
                  </Suspense>
                );
              }
              return renderChildRoutes;
            }}
          ></Route>
        );
      })}
    </Switch>
  );
};
// console.log(renderRoutes(routes), "renderRoutes(routes)");
const AppRoutes = () => <Router>{renderRoutes(routes)}</Router>;
export default AppRoutes;
