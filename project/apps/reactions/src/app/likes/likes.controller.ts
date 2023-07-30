import { Body, Controller, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesMessages } from './like.constant';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { LikeRdo } from './rdo/like.rdo';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: LikesMessages.Add
  })
  @Post("add/:postId")
  public async create( @Param('postId') postId:string, @Body('userId') userId:string) {
    const newLike = await this.likesService.create(postId, userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessages.Remove,
  })
  @Delete('delete/:postId')
  public async remove(@Param('postId') postId:string, @Body('userId') userId:string) {
    return await this.likesService.delete(postId, userId);
  }
}
