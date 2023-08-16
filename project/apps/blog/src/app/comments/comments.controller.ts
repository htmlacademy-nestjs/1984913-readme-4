import { Body, Controller, Get, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { API_TAG_NAME, CommentsError, CommentsMessages, CommentsPath } from './comments.constant';

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
  @Post(CommentsPath.Add)
  public async create( @Body() dto: CreateCommentDto) {
    const newComment = await this.commentsService.create(dto);
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
  public async showByPostId(@Param('postId') id: number) {
    const comments = await this.commentsService.findByPostId(id);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsMessages.Remove,
  })
  @Delete(CommentsPath.Delete)
  public async remove( @Param('commentId') id: number) {
    return await this.commentsService.delete(id);
  }
}
