import { request } from '@/apis/service';
import type Role from './index.d';

export const roleList = (params: Role.RoleListParams) => {
  return request<Role.RoleListResponse>({
    method: 'post',
    url: '/api/v1/role',
    data: params,
  });
};

export const createRole = (params: Role.CreateRoleParams) => {
  return request<Role.CreateRoleResponse>({
    method: 'post',
    url: '/api/v1/role/save',
    data: params,
  });
};

export const updateRole = (params: Role.UpdateRoleParams) => {
  return request<null>({
    method: 'put',
    url: '/api/v1/role',
    data: params,
  });
};

export const delRole = (params: Role.DeleteRoleParams) => {
  return request<null>({
    method: 'delete',
    url: '/api/v1/role',
    data: params,
  });
};
