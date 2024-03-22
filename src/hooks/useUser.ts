import { useState, useContext, createContext, useReducer } from 'react';
import { notification } from 'antd';
import { getToken, removeToken, setToken } from '@/utils/cache/cookies';
import { createAesKey, aesEncrypt, aesDecrypt } from '@/utils/crypto';
import Api from '@/apis';
import type Login from '@/apis/login/index.d';

const useUserHook = () => {
  const [auth, setAuth] = useState({
    isLogin: false,
    admin: false,
    username: '',
    role: 'user',
  });
  const key = 'qgajvd17wljhaicq';
  const loginFn = async (params: Login.LoginParams) => {
    const res = await Api.login({
      username: params.username,
      password: aesEncrypt(params.password, key),
      // password: params.password,
    });
    if (res) {
      // 存在res表示登录成功
      notification.success({
        message: '登录成功',
        closeIcon: false,
      });
      setToken(res.token);
      setAuth({
        isLogin: true,
        admin: res.user.role.role === 'admin',
        username: res.user.username,
        role: res.user.role.role,
      });
      console.log(auth, '接口');
      return res;
    }
  };
  const logoutFn = async () => {
    const res = await Api.logout();
    console.log(res, '登出');
    if (!res) {
      setAuth({
        isLogin: false,
        admin: false,
        username: '',
        role: 'user',
      });
    }
    return res;
  };
  return {
    auth,
    setAuth,
    login: loginFn,
    logout: logoutFn,
  };
};

export default useUserHook;
