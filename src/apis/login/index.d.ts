declare namespace Login {
  export interface LoginParams {
    username: string;
    password: string;
    remember?: boolean;
  }
  export interface LoginResponse {
    token: string;
  }
  export interface LogoutParams {
    token: string;
  }
}

export = Login;
export as namespace Login;
