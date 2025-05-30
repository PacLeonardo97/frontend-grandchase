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
