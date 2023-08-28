import { Injectable, BadRequestException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentQuery } from '../query/comment.query';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  public async create(dto: CreateCommentDto, userId:string) {
    const comment = {
      ...dto,
      _userId:userId
    };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository
      .create(commentEntity);
  }

  public async findByPostId(postId: number, query:CommentQuery) {
  return await this.commentRepository.findByPostId(postId, query);
  }

  public async delete(id:number, userId:string) {
    const commentData = await this.commentRepository.findById(id)
    if(commentData._userId !== userId){
      throw new BadRequestException('Comment is not authored by this user')
    }
        return this.commentRepository.destroy(id);
  }

}
