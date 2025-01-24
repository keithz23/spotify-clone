export interface ILoginResponse {
  id: unknown;
  email: string;
  username: string;
  role: string;
  token: string;
}

export interface ISignToken extends ILoginResponse {}
