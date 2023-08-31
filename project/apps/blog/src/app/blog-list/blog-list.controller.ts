import { Req, Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogListService } from './blog-list.service';
import { API_TAG_NAME, BlogListError, BlogListMessages, BlogListPath } from './blog-list.constant';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';
import { adaptRdoPublication } from '../publication/utils/adapt-rdo-publication';
import { JwtAuthGuard } from '@project/util/util-core';
import { NotifyService } from '../notify/notify.service';
import { RequestWithUserPayload } from '@project/shared/app-types';

@ApiTags(API_TAG_NAME)
@Controller(BlogListPath.Main)
export class BlogListController {
  constructor(
    private readonly blogListService: BlogListService,
    private readonly notifyService: NotifyService
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
  async showDrafts(@Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const posts = await this.blogListService.showDrafts(userId);
    return posts.map((post) => adaptRdoPublication(post) );
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description:BlogListMessages.NewsSent
  })
  @UseGuards(JwtAuthGuard)
  @Get(BlogListPath.SendNewsletter)
  public async sendNews(@Req() {user}: RequestWithUserPayload) {
    const {email, sub} = user;
    const posts = await this.blogListService.getPosts()
    this.notifyService.sendNewsletter({email, posts, id:sub});
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
