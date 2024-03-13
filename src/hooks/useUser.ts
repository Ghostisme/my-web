import { useState, useContext } from 'react';
import { notification } from 'antd';
import { getToken, removeToken, setToken } from '@/utils/cache/cookies';
import { createAesKey, aesEncrypt, aesDecrypt } from '@/utils/crypto';
import { login, logout } from '@/apis/login';
import type Login from '@/apis/login/index.d';

const useUserHook = () => {
  const [roles, setRoles] = useState({});
  const [username, setUserName] = useState('');
  const key = 'qgajvd17wljhaicq';
  const loginFn = async (params: Login.LoginParams) => {
    const res = await login({
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
      return res;
    }
  };
  const logoutFn = async () => {
    const res = await logout();
    console.log(res, '登出');
  };
  return {
    roles,
    username,
    login: loginFn,
    logout: logoutFn,
  };
};

export default useUserHook;
