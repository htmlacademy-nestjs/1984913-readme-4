import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  public async create(
    dto: CreateCommentDto
  ) {
    const comment = {
      ...dto,
      _userId: '1',
    };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository
      .create(commentEntity);
  }

  public async findByPostId(postId: number) {
  return await this.commentRepository.findByPostId(postId);
  }

  public async delete(id:number) {
        return this.commentRepository.destroy(id);
  }

}
