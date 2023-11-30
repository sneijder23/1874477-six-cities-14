export type ServerUser = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
}

export type User = Omit<ServerUser, 'email' | 'token'>;
