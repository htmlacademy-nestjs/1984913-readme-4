import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationMemoryRepository } from './publication-memory.repository';
import { PublicationStatus } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { DEFAULT_AMOUNT, PublicationsError } from './publication.constant';
import { TextPublicationEntity } from './entity/publication-text.entity';
import { CreateTextPublicationDto } from './dto/create/publication-text.dto';
import { UpdateTextPublicationDto } from './dto/update/publication-text.dto';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationMemoryRepository
  ) {}

  public async create(dto:  CreateTextPublicationDto ) {
    const publication = {
      ...dto,
      _userId: '1',
      _originUserId: '1',
      createdDate: dayjs().toISOString(),
      postedDate: dayjs().toISOString(),
      status: PublicationStatus.Posted,
      likesCount: DEFAULT_AMOUNT,
      commentsCount: DEFAULT_AMOUNT,
      isReposted: false,
    };

    const postEntity = new TextPublicationEntity(publication);
    return this.publicationRepository.create(postEntity);
  }

  public async update(postId: string, dto: UpdateTextPublicationDto ) {
    const publication = await this.findByPostId(postId);
    if(!publication){
      throw new NotFoundException(PublicationsError.PublicationNotFound);
    }
    const updatedPublication = {...publication, ...dto}
    const postEntity = new TextPublicationEntity(updatedPublication);

    return this.publicationRepository.update(postId, postEntity);
  }

  public async findByPostId(id: string) {
    const publication  = await this.publicationRepository.findById(id);
    if (!publication) {
      throw new NotFoundException(PublicationsError.PublicationNotFound);
    }
    return publication;
  }


  public async remove(postId: string) {
    return this.publicationRepository.destroy(postId);
  }

}

