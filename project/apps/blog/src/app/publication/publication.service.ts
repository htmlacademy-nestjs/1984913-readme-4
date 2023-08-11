import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import dayjs from 'dayjs';
import { DEFAULT_AMOUNT, PublicationsError } from './publication.constant';
import { CreateBlogPublicationDto } from './dto/create/blog-publication-dto.type';
import { TypeEntityAdapter } from './utils/entity-adapter';
import { UpdateBlogPublicationDto } from './dto/update/blog-publication-dto.type';
import { PublicationStatus } from '@prisma/client';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
  ) {}

  public async create(dto:  CreateBlogPublicationDto ) {
    const publication = {
      ...dto,
      _userId: '1',
      _originUserId: '1',
      createdDate: dayjs().toISOString(),
      postedDate: dayjs().toISOString(),
      status: PublicationStatus.posted,
      likesCount: DEFAULT_AMOUNT,
      commentsCount: DEFAULT_AMOUNT,
      isReposted: false,
    };
    const postEntity = await new TypeEntityAdapter[publication.type](publication);
    return this.publicationRepository.create(postEntity);
  }

  public async update(postId: number, dto: UpdateBlogPublicationDto ) {
    const publication = await this.findByPostId(postId);
    const updatedPublication = {...publication, ...dto}
    const postEntity = await new TypeEntityAdapter[updatedPublication.type](updatedPublication);
    return this.publicationRepository.update(postId, postEntity);
  }

  public async findByPostId(id: number) {
    const publication  = await this.publicationRepository.findById(id);
    if (!publication) {
      throw new NotFoundException(PublicationsError.PublicationNotFound);
    }
    return publication;
  }


  public async remove(postId: number) {
    return this.publicationRepository.destroy(postId);
  }

}

