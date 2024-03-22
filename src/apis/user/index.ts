import { request } from '@/apis/service';
import type User from './index.d';

export const userList = (params: User.UserListParams) => {
  return request<User.UserListResponse>({
    method: 'post',
    url: '/api/v1/user',
    data: params,
  });
};
