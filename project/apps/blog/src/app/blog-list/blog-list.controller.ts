import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BlogListService } from './blog-list.service';
import { BlogListError, BlogListMessages } from './blog-list.constant';
import { fillObject } from '@project/util/util-core';
import { TextPublicationRdo } from '../publication/rdo/publication-text.rdo';

@Controller('blog-list')
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
  @Get('/')
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

  @Get(':id')
  public async showById(@Param('id') id: string) {
    const publication = await this.blogListService.findByPostId(id);
    return fillObject(TextPublicationRdo, publication);
  }
}
