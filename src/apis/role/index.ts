import { request } from '@/apis/service';
import type Role from './index.d';

export const roleList = (params: Role.RoleListParams) => {
  return request<Role.RoleListResponse>({
    method: 'post',
    url: '/api/v1/role',
    data: params,
  });
};
