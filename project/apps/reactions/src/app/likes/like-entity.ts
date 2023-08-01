import { Like } from '@project/shared/app-types';

export class LikeEntity implements Like {
  public _id: string;
  public postId: string;
  public userId: string;

  constructor(like: Like) {
    this.fillEntity(like);
  }

  public toObject() {
    return {
      _id: this._id,
      postId: this.postId,
      userId: this.userId,
    };
  }

  public fillEntity(like: Like) {
    this._id = like._id;
    this.postId = like.postId;
    this.userId = like.userId;
  }
}
