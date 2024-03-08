import service from '@/apis/service';
import type Login from './index.d';

export const login = (params: Login.LoginParams) => {
  return service.post('/api/v1/login', params);
};
