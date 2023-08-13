import { IComment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class CommentEntity implements IComment, Entity<CommentEntity> {
  public _id?: number;
  public _userId?: string;
  public createdDate: string;
  public postId: number;
  public text: string;

  constructor(comment: IComment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(comment: IComment) {
    this._id = comment._id;
    this._userId = comment._userId;
    this.createdDate = comment.createdDate;
    this.postId = comment.postId;
    this.text = comment.text;
  }

}
