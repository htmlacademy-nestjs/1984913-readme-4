export interface User {
  _id?: string;
  email: string;
  name: string;
  avatar?: string;
  passwordHash: string;
  postsCount?:number;
  subscribersCount?:number;
}
