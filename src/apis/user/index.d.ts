declare namespace User {
  export interface UserListParams {
    beginTime?: string;
    endTime?: string;
    keyWord?: string;
    status?: number;
    page: number;
    pageSize: number;
  }
  export interface UserListResponse {
    list: UserInfo[];
  }
  export type UserInfo = {
    id: number;
    username: string;
    // password: string;
    create_time: string;
    update_time: string;
    delete_time: string;
    status: number;
    // role: Role;
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

export = User;
export as namespace User;
