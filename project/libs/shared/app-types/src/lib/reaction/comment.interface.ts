export interface IComment {
  _id?: number;
  _userId?: string;
  createdDate?: string;
  postId: number;
  text: string;
}
