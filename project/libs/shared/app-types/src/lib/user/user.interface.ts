export interface User {
  _id?: string;
  email: string;
  userName: string;
  avatar?: string;
  passwordHash: string;
  postsCount?:number;
  subscribersCount?:number;
}
