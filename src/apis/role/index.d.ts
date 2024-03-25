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
