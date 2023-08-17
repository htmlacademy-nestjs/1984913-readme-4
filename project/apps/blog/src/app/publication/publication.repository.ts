import { CRUDRepository } from '@project/util/util-types';
import { BlogPublication, PublicationType} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './entity/publication.entity';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaPublication } from './utils/adapt-prisma-publication';
import { PublicationStatus } from '@prisma/client';
import { PostQuery } from '../query/post.query';

@Injectable()
export class PublicationRepository implements CRUDRepository<PublicationEntity, number, BlogPublication> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PublicationEntity): Promise<BlogPublication> {
    const data = {
      ...item.toObject(),
      userId: item._userId,
      originUserId: item._originUserId
    }
    delete data._userId;
    delete data._originUserId;
    const publication = await this.prisma.publication.create({data});
    return adaptPrismaPublication(publication)
  }

  public async findById(postId: number): Promise<BlogPublication | null> {
    const publication =  await this.prisma.publication.findFirst({
      where: {
        postId
      }
    });
    return adaptPrismaPublication(publication)
  }

  public async findAll({limit, page, sortBy,type, sortDirection }:PostQuery): Promise<BlogPublication[]> {
    const publications = await this.prisma.publication.findMany({
      where: {
        AND:{
          status:PublicationStatus.posted,
          type:type as PublicationType,
        }
      },
      take: limit,
      include: {
        comments: true,
      },
      orderBy: [
        { [sortBy]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return publications.map((publication)=> adaptPrismaPublication(publication))
  }

  public async update(postId: number, item: PublicationEntity): Promise<BlogPublication> {
    const data =   {
        ...item.toObject(),
        userId: item._userId,
        originUserId: item._originUserId
      }
      delete data._id;
      delete data._userId;
      delete data._originUserId;

    const publication = await  this.prisma.publication.update({
      where: {postId},
      data
    });
    return adaptPrismaPublication(publication)
  }

  public async destroy(postId: number): Promise<void> {
  await this.prisma.publication.delete({where: {postId} });
}
}

