import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from '../publication/publication.repository';
import { BlogPublication } from '@project/shared/app-types';
import { BlogListError } from './blog-list.constant';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';


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

  public async showAll(query:PostQuery): Promise<BlogPublication[]> {
    return this.publicationRepository.findAll(query);
  }

  public async getPosts (): Promise<BlogPublication[]> {
    return this.publicationRepository.getFullList();
  }

  public async searchByTitle(query:SearchPostsQuery): Promise<BlogPublication[]> {
    return this.publicationRepository.searchByTitle(query);
  }

  public async showDrafts(userId:string): Promise<BlogPublication[]> {
    return this.publicationRepository.findDrafts(userId);
  }


}
