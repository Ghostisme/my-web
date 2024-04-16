import { request } from '@/apis/service';
import type Login from './index.d';

export const login = (params: Login.LoginParams) => {
  return request<Login.LoginResponse>({
    method: 'post',
    url: '/api/v1/login',
    data: params,
  });
};

export const logout = () => {
  return request<null>({
    method: 'get',
    url: '/api/v1/logout',
  });
};

export const getCode = (params: Login.GetCodeParams) => {
  return request<Login.GetCodeResponse>({
    method: 'post',
    url: '/api/v1/code',
    data: params,
  });
};

export const register = (params: Login.UserRegister | Login.MobileRegister) => {
  const { type, ...newParams } = params;
  if (type) {
    return request<null>({
      method: 'post',
      url: '/api/v1/register/user',
      data: newParams,
    });
  } else {
    return request<null>({
      method: 'post',
      url: '/api/v1/register/mobile',
      data: newParams,
    });
  }
};
