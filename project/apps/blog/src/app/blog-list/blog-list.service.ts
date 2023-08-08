import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from '../publication/publication.repository';
import { BlogPublication } from '@project/shared/app-types';
import { BlogListError } from './blog-list.constant';

@Injectable()
export class BlogListService {
  constructor(
    private readonly publicationRepository: PublicationRepository
  ) {}

  public async findByPostId(id: number) {
    const publication  = await this.publicationRepository.findById(id);
    if (!publication) {
      throw new NotFoundException (BlogListError.PublicationNotFound);
    }
    return publication;
  }

  async showAll(): Promise<BlogPublication[]> {
    return this.publicationRepository.findAll();
  }
}
