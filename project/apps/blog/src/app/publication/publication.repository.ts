import { CRUDRepository } from '@project/util/util-types';
import { BlogPublication} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { BlogPublicationEntity } from './entity/blog-publication-entity.type';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaPublication } from './utils/adapt-prisma-publication';

@Injectable()
export class PublicationRepository implements CRUDRepository<BlogPublicationEntity, number, BlogPublication> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPublicationEntity): Promise<BlogPublication> {
    const publication = await this.prisma.publication.create({data:{...item.toObject()}});
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

  public async findAll(ids: number[] = []): Promise<BlogPublication[]> {
    const publications = await this.prisma.publication.findMany({
      where: {
        postId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
    return publications.map((publication)=> adaptPrismaPublication(publication))
  }

  public async update(postId: number, item: BlogPublicationEntity): Promise<BlogPublication> {
    const publication = await  this.prisma.publication.update({
      where: {postId},
      data: { ...item.toObject()}
    });
    return adaptPrismaPublication(publication)
  }

  public async destroy(postId: number): Promise<void> {
  await this.prisma.publication.delete({where: {postId} });
}
}

