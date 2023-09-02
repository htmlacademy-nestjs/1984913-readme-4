import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Like } from '@project/shared/app-types';
import { LikeEntity } from './like-entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeRepository implements CRUDRepository<LikeEntity, number, Like> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: LikeEntity): Promise<Like> {
    await this.prisma.publication.update(
      {
        where: {
          postId:item.postId
        },
        data:{
          likesCount: {increment:1}
        }
      }
    )
  return await this.prisma.like.create({data: {...item.toObject()}})
  }

  public async findById(postId: number): Promise<Like | null> {
    return await this.prisma.like.findFirst({
      where: {
        postId
      }
    });
  }

  public async update(postId: number, item: LikeEntity): Promise<Like> {
    await this.prisma.publication.update(
      {
        where: {
          postId
        },
        data:{
          likesCount: item.likedByUsersIds.length
        }
      }
    )
    return await this.prisma.like.update({
      where: {
        postId
      },
      data: {...item.toObject()}
    });
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.like.delete({ where: {postId} });
  }

}
