import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import dayjs from 'dayjs';
import { CommentsError } from './comments.constant';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository,
  ) {}

  public async create(
    dto: CreateCommentDto
  ) {
    const comment = {
      ...dto,
      _userId: '',
      createdDate:dayjs().unix(),
    };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository
      .create(commentEntity);
  }

  public async findByPostId(postId: string) {
   const existingComments = await this.commentRepository.findByPostId(postId);

    if (!existingComments) {
      throw new NotFoundException(CommentsError.PostNotFound);
    }
    return existingComments;
  }

  public async delete(id:string, postId: string, userId:string) {
    const comments = await this.commentRepository.findByPostId(postId)
    const comment = comments.find((item)=> item._id === id )
    if (!comment) {
      throw new NotFoundException(CommentsError.PostNotFound);
    }
    const isAuthor = comment._userId === userId
    if(!isAuthor){
      throw new BadRequestException (CommentsError.WrongUser);
    }
    return this.commentRepository.destroy(comment._id);
  }


}
