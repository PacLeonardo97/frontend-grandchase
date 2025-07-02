export interface IUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  chaser_level: number;
  updatedAt: string;
  publishedAt: string;
}

export interface IUserState {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
