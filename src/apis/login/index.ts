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
  return request({
    method: 'get',
    url: '/api/v1/logout',
  });
};
