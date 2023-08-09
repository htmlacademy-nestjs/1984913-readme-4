import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeEntity } from './like-entity';

@Injectable()
export class LikesService {
  constructor(private readonly likeRepository: LikeRepository) { }
  public async create(postId: number) {
    const like = { postId, likedByUsersIds: [] };
    const likeEntity = new LikeEntity(like);
    return this.likeRepository.create(likeEntity);
  }

  public async findByPostId(postId: number) {
    return await this.likeRepository.findById(postId);
  }


  public async changeLikePublication(postId: number, userId: string) {
    const likesData = (await this.findByPostId(postId)).likedByUsersIds;
    let updatedList: string[];
    if (!likesData.includes(userId)) {
      updatedList = likesData.concat(userId);
} else {
      updatedList = likesData.filter((item)=> item !== userId);
    }
    const likeEntity = new LikeEntity({
      postId,
      likedByUsersIds: updatedList,
    });
    return this.likeRepository.update(postId, likeEntity);
  }
}
