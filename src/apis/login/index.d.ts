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
  export interface GetCodeParams {
    mobile: string;
  }
  export interface GetCodeResponse {
    code: string;
    img: string;
  }
  export interface RegisterParams {
    type: boolean;
    // username?: string;
    // password?: string;
    // mobile?: string;
    // code?: string;
  }
  export interface UserRegister {
    type: boolean;
    username: string;
    password: string;
  }
  export interface MobileRegister {
    type: boolean;
    mobile: string;
    code: string;
  }
  export interface RegisterParams extends UserRegister, MobileRegister {}
  // export enum RegisterParams {
  //   'user' = UserRegister,
  //   'mobile' = MobileRegister,
  //   UserRegister = "user",
  //   MobileRegister = "mobile"
  //   user = UserRegister,
  // }
}

export = Login;
export as namespace Login;
