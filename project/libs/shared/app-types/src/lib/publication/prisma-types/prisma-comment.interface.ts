export interface PrismaComment {
  commentId: number;
  userId: string;
  postId: number;
  createdDate: Date;
  text: string;
}
