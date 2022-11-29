export interface IUser {
  id?: number;
  username: string;
  email: string;
  role: string;
  password?: string;
}

export interface ILogin {
  username: string;
  password: string;
}
