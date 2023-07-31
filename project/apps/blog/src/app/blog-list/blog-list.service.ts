import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationMemoryRepository } from '../publication/publication-memory.repository';
import { BlogPublication } from '@project/shared/app-types';
import { BlogListError } from './blog-list.constant';

@Injectable()
export class BlogListService {
  constructor(
    private readonly publicationRepository: PublicationMemoryRepository
  ) {}

  public async findByPostId(id: string) {
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
