import { Body, Req, Controller, Get, HttpStatus, Param, Post, Delete, Query, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { CreateCommentDto } from '@project/shared/shared-dto';
import { CommentRdo } from './rdo/comment.rdo';
import { API_TAG_NAME, CommentsError, CommentsMessages, CommentsPath } from './comments.constant';
import { CommentQuery } from '@project/shared/shared-queries';
import { RequestWithUserPayload } from '@project/shared/app-types';

@ApiTags(API_TAG_NAME)
@Controller(CommentsPath.Main)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: CommentsMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @Post(CommentsPath.Add)
  public async create( @Body() dto: CreateCommentDto, @Req() {user}:RequestWithUserPayload) {
    const userId = user.sub;
    const newComment = await this.commentsService.create(dto, userId);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentsMessages.Show
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsError.PublicationNotFound
  })
  @Get(CommentsPath.PostId)
  public async showByPostId(@Param('postId') id: number, @Query() query:CommentQuery) {
    const comments = await this.commentsService.findByPostId(id, query);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsMessages.Remove,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(CommentsPath.Delete)
  public async remove( @Param('commentId') id: number, @Req() {user}:RequestWithUserPayload) {
    const userId = user.sub;
    return await this.commentsService.delete(id, userId);
  }
}
