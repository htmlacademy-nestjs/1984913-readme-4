import { CRUDRepository } from '@project/util/util-types';
import { BlogPublication, PublicationStatus, PublicationType } from '@project/shared/app-types';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaPublication } from './utils/adapt-prisma-publication';
import { BlogPublicationEntity } from './entity/blog-publication-entity.type';
import { formatTags } from './utils/helpers';

@Injectable()
export class PublicationRepository implements CRUDRepository<BlogPublicationEntity, number, BlogPublication> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: BlogPublicationEntity): Promise<BlogPublication> {
    const data = {
      ...item.toObject(),
      tags:formatTags(item.tags),
      userId: item._userId,
      originUserId: item._originUserId,
      originId: item._originId,
    }
    delete data._userId;
    delete data._originUserId;
    delete data._id;
    delete data._originId;
    const publication = await this.prisma.publication.create({ data });
    return adaptPrismaPublication(publication)
  }

  public async findById(postId: number): Promise<BlogPublication | null> {
    const publication = await this.prisma.publication.findFirst({
      where: {
        postId
      },
      include: {
        comments: true,
        likes: true,
      },
    });
    return adaptPrismaPublication(publication)
  }
  public async findRepost(postId: number, userId:string): Promise<BlogPublication | null> {
    const publication = await this.prisma.publication.findFirst({
      where: {
      AND:{
        originId:postId,
        userId
      }},
      include: {
        comments: true,
        likes: true,
      },
    });
    return adaptPrismaPublication(publication)
  }

  public async findAll({ limit, page, sortBy, type, sortDirection, user, tag }: PostQuery): Promise<BlogPublication[]> {
    const queryParams = {
      where: {
        AND: {
          status: PublicationStatus.Posted,
          type: type as PublicationType,
          userId: user,
          tags:undefined
        }
      },
      take: limit,
      include: {
        comments: true,
        likes: true,
      },
      orderBy: [
        { [sortBy]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }
    if (tag) {
      queryParams.where.AND.tags = { has: tag };
    }
    const publications = await this.prisma.publication.findMany(queryParams);
    return publications.map((publication) => adaptPrismaPublication(publication))
  }

  public async getFullList(): Promise<BlogPublication[]> {
    const publications = await this.prisma.publication.findMany({
      where: {
          status: PublicationStatus.Posted
      },
      include: {
        comments: true,
        likes: true,
      },
    });
    return publications.map((publication) => adaptPrismaPublication(publication))
  }

  public async searchByTitle({ title, limit }: SearchPostsQuery): Promise<BlogPublication[]> {
    const publications = await this.prisma.publication.findMany({
      where: {
        AND: {
          status: PublicationStatus.Posted,
          title: {
            search: title.split(" ").join(" & ")
          }
        }
      },
      take: limit,
      include: {
        comments: true,
        likes: true,
      },
    });
    return publications.map((publication) => adaptPrismaPublication(publication))
  }

  public async findDrafts(userId: string): Promise<BlogPublication[]> {
    const publications = await this.prisma.publication.findMany({
      where: {
        AND: {
          status: PublicationStatus.Draft,
          userId: userId,
        }
      },
      include: {
        comments: true,
        likes: true,
      }
    });
    return publications.map((publication) => adaptPrismaPublication(publication))
  }

  public async update(postId: number, item: BlogPublicationEntity): Promise<BlogPublication> {
    const data = {
      ...item.toObject(),
      tags:formatTags(item.tags),
      userId: item._userId,
      originUserId: item._originUserId
    }
    delete data._id;
    delete data._userId;
    delete data._originUserId;

    const publication = await this.prisma.publication.update({
      where: { postId },
      data,
      include: {
        comments: true,
        likes: true,
      }
    });
    return adaptPrismaPublication(publication)
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.publication.delete({ where: { postId } });
  }
}

