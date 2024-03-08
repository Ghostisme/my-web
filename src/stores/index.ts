import React from 'react';
import GlobalStore from './globalStore';

const context = {};
const req = {
    'globalStore': GlobalStore
};
Object.keys(req).forEach((key) => {
    // console.log(key, 'key');
    // 对象正则匹配可能为null ts添加断言操作 key.match(/([a-zA-Z0-9].*)$/)[1] (错误的)
    const name = key.match(/([a-zA-Z0-9].*)$/)![1];
    const Store = req[key];
    // console.log(name, 'name');
    // console.log(Store, 'Store');
    context[name] = new Store();
})
// req.keys().forEach((key) => {
//     console.log(key, 'key');
//   const name = key.match(/([a-zA-Z0-9].*)$/)[1];
//   const Store = req(key).default;
//   context[name] = new Store();
// });

export const storesContext = React.createContext(context);

export function appStores() {
  // console.log(React.useContext(storesContext), 'React.useContext(storesContext)')
  return React.useContext(storesContext);
}