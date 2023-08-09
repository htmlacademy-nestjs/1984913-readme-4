import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationStatus, PublicationType } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { DEFAULT_AMOUNT, PublicationsError } from './publication.constant';
import { CreateBlogPublicationDto } from './dto/create/blog-publication-dto.type';
import { TypeEntityAdapter } from './utils/entity-adapter';
import { UpdateBlogPublicationDto } from './dto/update/blog-publication-dto.type';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository
  ) {}

  // public async create(dto:  CreateBlogPublicationDto ) {
  //   const publication = {
  //     ...dto,
  //     _userId: '1',
  //     _originUserId: '1',
  //     createdDate: dayjs().toISOString(),
  //     postedDate: dayjs().toISOString(),
  //     status: PublicationStatus.Posted,
  //     type: PublicationType.Text,
  //     likesCount: DEFAULT_AMOUNT,
  //     commentsCount: DEFAULT_AMOUNT,
  //     isReposted: false,
  //   };

  //   const postEntity =  new TypeEntityAdapter[publication.type](publication);
  //   return this.publicationRepository.create(postEntity);
  // }

  // public async update(postId: number, dto: UpdateBlogPublicationDto ) {
  //   const publication = await this.findByPostId(postId);
  //   if(!publication){
  //     throw new NotFoundException(PublicationsError.PublicationNotFound);
  //   }
  //   const status = dto.status? PublicationStatus[dto.status] : publication.status
  //   const updatedPublication = {...publication, ...dto, type:PublicationType[dto.type], status}

  //   const postEntity = new TypeEntityAdapter[publication.type](updatedPublication);
  //   return this.publicationRepository.update(postId, postEntity);
  // }

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
