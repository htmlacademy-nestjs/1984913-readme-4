import { Body, Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogListService } from './blog-list.service';
import { API_TAG_NAME, BlogListError, BlogListMessages, BlogListPath } from './blog-list.constant';
import { PostQuery } from '../query/post.query';
import { adaptRdoPublication } from '../publication/utils/adapt-rdo-publication';
import { SearchPostsQuery } from '../query/search.query';
import { JwtAuthGuard } from '@project/util/util-core';

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
  public async show(@Query() query:PostQuery) {
    const posts = await this.blogListService.showAll(query);
    return posts.map((post) => adaptRdoPublication(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogListMessages.ShowAll
  })
  @Get(BlogListPath.Search)
  public async searchByTitle(@Query() query:SearchPostsQuery) {
    const posts = await this.blogListService.searchByTitle(query);
    return posts.map((post) => adaptRdoPublication(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogListMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogListError.EmptyList
  })
  @UseGuards(JwtAuthGuard)
  @Get(BlogListPath.Drafts)
  async showDrafts(@Body("userId") userId:string) {
    const posts = await this.blogListService.showDrafts(userId);
    return posts.map((post) => adaptRdoPublication(post) );
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
  public async showById(@Param('id') id: number) {
    const publication = await this.blogListService.findByPostId(id);
    return adaptRdoPublication(publication);
  }

}
