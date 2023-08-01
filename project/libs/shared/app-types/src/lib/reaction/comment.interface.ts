export interface Comment {
  _id?: string;
  _userId: string;
  createdDate: number;
  postId: string;
  text: string;
}
