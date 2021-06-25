export interface LoginFormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  username: string;
  password: string;
  token?: string;
}
