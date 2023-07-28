import { Comment } from '@project/shared/app-types';

export class CommentEntity implements Comment {
  public _id: string;
  public _userId: string;
  public createdDate: number;
  public postId: string;
  public text: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {
      _id: this._id,
      _userId: this._userId,
      createdDate: this.createdDate,
      postId: this.postId,
      text: this.text,
    };
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this._userId = comment._userId;
    this.createdDate = comment.createdDate;
    this.postId = comment.postId;
    this.text = comment.text;
  }

}
