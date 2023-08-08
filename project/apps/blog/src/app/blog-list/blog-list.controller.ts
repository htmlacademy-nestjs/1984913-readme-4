import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogListService } from './blog-list.service';
import { API_TAG_NAME, BlogListError, BlogListMessages, BlogListPath } from './blog-list.constant';
import { fillObject } from '@project/util/util-core';
import { TextPublicationRdo } from '../publication/rdo/publication-text.rdo';

@ApiTags(API_TAG_NAME)
@Controller(BlogListPath.Main)
export class BlogListController {
  constructor(
    private readonly blogListService: BlogListService
  ) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogListMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogListError.EmptyList
  })
  @Get()
  async show() {
    const posts = await this.blogListService.showAll();
    return posts.map((post) => fillObject(TextPublicationRdo, post) );
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogListMessages.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogListError.PublicationNotFound
  })

  @Get(BlogListPath.Id)
  public async showById(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    const publication = await this.blogListService.findByPostId(postId);
    return fillObject(TextPublicationRdo, publication);
  }
}
