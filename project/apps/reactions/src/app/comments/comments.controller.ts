import { Body, Controller, Get, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentsError, CommentsMessages } from './comments.constant';
import { deleteCommentParams } from './comment-param.type';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: CommentsMessages.Add
  })
  @Post("add")
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
  @Get(':postId')
  public async showByPostId(@Param('postId') postId: string) {
    const comments = await this.commentsService.findByPostId(postId);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsMessages.Remove,
  })
  @Delete('delete/:postId/:commentId')
  public async remove(@Param() params:deleteCommentParams, @Body('userId') userId:string) {
    return await this.commentsService.delete(params.commentId, params.postId,userId );
  }
}
