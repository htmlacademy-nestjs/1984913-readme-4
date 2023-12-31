import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { DEFAULT_AMOUNT, PublicationsError } from './publication.constant';
import { CreateBlogPublicationDto, UpdateBlogPublicationDto } from '@project/shared/shared-dto';
import { TypeEntityAdapter } from './utils/entity-adapter';
import { getDate } from './utils/helpers';
import { PublicationStatus } from '@project/shared/app-types';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
  ) { }

  public async create(dto: CreateBlogPublicationDto, userId: string) {
    const publication = {
      ...dto,
      _userId: userId,
      createdDate: getDate(),
      postedDate: getDate(),
      status: PublicationStatus.Posted,
      likesCount: DEFAULT_AMOUNT,
      commentsCount: DEFAULT_AMOUNT,
      isReposted: false,
    };
    const postEntity = await new TypeEntityAdapter[publication.type](publication);
    return this.publicationRepository.create(postEntity);
  }

  public async update(postId: number, dto: UpdateBlogPublicationDto, userId: string) {
    const publication = await this.findByPostId(postId);
    if (userId !== publication._userId) {
      throw new BadRequestException(PublicationsError.NotUserAuthor)
    }
    const updatedPublication = { ...publication, ...dto, postedDate: getDate() }
    const postEntity = await new TypeEntityAdapter[updatedPublication.type](updatedPublication);
    return this.publicationRepository.update(postId, postEntity);
  }

  public async findByPostId(id: number) {
    const publication = await this.publicationRepository.findById(id);
    if (!publication) {
      throw new NotFoundException(PublicationsError.PublicationNotFound);
    }
    return publication;
  }

  public async repost(id: number, userId: string) {
    const originalPost = await this.findByPostId(id);
    const isAlreadyReposted = await this.publicationRepository.findRepost(id, userId)
    if (isAlreadyReposted) {
      throw new BadRequestException(PublicationsError.AlreadyReposted)
    }
    const publication = {
      ...originalPost as CreateBlogPublicationDto,
      isReposted: true,
      _userId: userId,
      _originUserId: originalPost._userId,
      _originId: originalPost._id,
      postedDate: getDate(),
      likesCount: DEFAULT_AMOUNT,
      commentsCount: DEFAULT_AMOUNT,
    };
    const postEntity = await new TypeEntityAdapter[publication.type](publication);
    return this.publicationRepository.create(postEntity);
  }

  public async remove(postId: number, userId: string) {
    const publication = await this.findByPostId(postId);
    if (userId !== publication._userId) {
      throw new BadRequestException(PublicationsError.NotUserAuthor)
    }
    return this.publicationRepository.destroy(postId);
  }

}

