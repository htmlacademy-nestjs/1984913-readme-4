import { CRUDRepository } from '@project/util/util-types';
import { BlogPublication, PublicationStatus, PublicationType } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaPublication } from './utils/adapt-prisma-publication';
import { PostQuery } from '../query/post.query';
import { BlogPublicationEntity } from './entity/blog-publication-entity.type';
import { SearchPostsQuery } from '../query/search.query';

@Injectable()
export class PublicationRepository implements CRUDRepository<BlogPublicationEntity, number, BlogPublication> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: BlogPublicationEntity): Promise<BlogPublication> {
    const data = {
      ...item.toObject(),
      userId: item._userId,
      originUserId: item._originUserId
    }
    delete data._userId;
    delete data._originUserId;
    const publication = await this.prisma.publication.create({ data });
    return adaptPrismaPublication(publication)
  }

  public async findById(postId: number): Promise<BlogPublication | null> {
    const publication = await this.prisma.publication.findFirst({
      where: {
        postId
      }
    });
    return adaptPrismaPublication(publication)
  }

  public async findAll({ limit, page, sortBy, type, sortDirection, user }: PostQuery): Promise<BlogPublication[]> {
    const publications = await this.prisma.publication.findMany({
      where: {
        AND: {
          status: PublicationStatus.Posted,
          type: type as PublicationType,
          userId: user
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
      userId: item._userId,
      originUserId: item._originUserId
    }
    delete data._id;
    delete data._userId;
    delete data._originUserId;

    const publication = await this.prisma.publication.update({
      where: { postId },
      data
    });
    return adaptPrismaPublication(publication)
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.publication.delete({ where: { postId } });
  }
}

