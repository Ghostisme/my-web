declare namespace Login {
  export interface LoginParams {
    username: string;
    password: string;
    remember?: boolean;
  }
  export interface LoginResponse {
    token: string;
    user: User;
  }
  export type User = {
    id: number;
    username: string;
    password: string;
    create_time: string;
    update_time: string;
    delete_time: string;
    status: number;
    role: Role;
  };
  export type Role = {
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
  export interface LogoutParams {
    token: string;
  }
}

export = Login;
export as namespace Login;
