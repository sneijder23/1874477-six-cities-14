export type ServerUser = {
  avatarUrl: string;
  email: string;
  id: string;
  isPro: boolean;
  name: string;
  token: string;
}

export type User = Omit<ServerUser, 'email' | 'token'>;

export type LoginData = {
  email: string;
  password: string;
}
