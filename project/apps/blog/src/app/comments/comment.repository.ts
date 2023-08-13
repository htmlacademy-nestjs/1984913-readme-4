import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { IComment } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaComment } from './utils/adapt-prisma-comment';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, number, IComment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<IComment> {
    const data = { ...item.toObject(), userId: item._userId};
    delete data._userId;
    const comment = await this.prisma.comment.create({data})
    return adaptPrismaComment(comment);
  }

  public async findById(commentId: number): Promise<IComment> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        commentId
      }
    });
    return adaptPrismaComment(comment);
  }

  public async findByPostId(postId: number): Promise<IComment[] | null> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId
      }
    });
    return comments.map((item) => {
      return adaptPrismaComment(item);
    })
  }

  public async update(commentId: number, item: CommentEntity): Promise<IComment> {
    const comment = await this.prisma.comment.update({
      where: {
        commentId
      },
      data: {...item.toObject()}
    });
    return adaptPrismaComment(comment);
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({ where: {commentId} });  
  }
}
