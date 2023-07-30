import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LikeMemoryRepository } from './like-memory.repository';
import { LikeEntity } from './like-entity';
import { LikesError } from './like.constant';

@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeMemoryRepository,
  ) {}
  public async create(postId:string, userId:string ) {
    const like = {postId, userId};
    
    const likes = await this.findByPostId(postId)
    const likeExists = likes.find((item)=> item.userId === userId )
    if (likeExists) {
      throw new BadRequestException(LikesError.LikeExists);
    }

    const likeEntity = new LikeEntity(like);

    return this.likeRepository
      .create(likeEntity);
  }

  public async findByPostId(postId: string) {
  const existingLikes = await this.likeRepository.findByPostId(postId);

    if (!existingLikes) {
      throw new NotFoundException(LikesError.PostNotFound);
    }
    return existingLikes;
  }

  public async delete(postId: string, userId:string) {
    const likes = await this.findByPostId(postId)
    const like = likes.find((item)=> item.userId === userId )
    if (!like) {
      throw new NotFoundException(LikesError.LikeNotFound);
    }
    return this.likeRepository.destroy(like._id);
  }
}
