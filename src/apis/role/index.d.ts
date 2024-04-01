declare namespace Role {
  export interface RoleListParams {
    beginTime?: string;
    endTime?: string;
    keyWord?: string;
    status?: number;
    page: number;
    pageSize: number;
  }
  export interface RoleListResponse {
    list: RoleInfo[];
  }
  export type RoleInfo = {
    id: number;
    role: string;
    role_name: string;
    create_time: string;
    update_time: string;
    delete_time: string;
    operator: string;
    operator_id: number;
    status: number;
  };

  export interface CreateRoleParams {
    is_admin: number;
    status: number;
    name: string;
  }

  export interface CreateRoleResponse {
    id: number;
  }

  export interface UpdateRoleParams {
    id: number;
    status?: number;
    name?: string;
  }
  export interface DeleteRoleParams {
    id: number;
  }
  // export type Role = {
  //   id: number;
  //   role: string;
  //   role_name: string;
  //   create_time: string;
  //   update_time: string;
  //   delete_time: string;
  //   operator: string;
  //   operator_id: number;
  //   status: number;
  // };
  // export interface LogoutParams {
  //   token: string;
  // }
}

export = Role;
export as namespace Role;
