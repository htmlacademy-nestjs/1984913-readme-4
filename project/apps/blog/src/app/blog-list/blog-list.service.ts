import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from '../publication/publication.repository';
import { BlogPublication } from '@project/shared/app-types';
import { BlogListError } from './blog-list.constant';
import { PostQuery } from '../query/post.query';

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

  async showAll(query:PostQuery): Promise<BlogPublication[]> {
    return this.publicationRepository.findAll(query);
  }
}
