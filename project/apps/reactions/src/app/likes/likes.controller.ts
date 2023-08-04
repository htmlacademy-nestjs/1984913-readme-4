import { Body, Controller, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { API_TAG_NAME, LikesMessages, LikesPath } from './like.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags(API_TAG_NAME)
@Controller(LikesPath.Main)
export class LikesController {
  constructor(
    private readonly likesService: LikesService
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: LikesMessages.Add
  })
  @Post(LikesPath.Add)
  public async create( @Param('postId') postId:string, @Body('userId') userId:string) {
    const newLike = await this.likesService.create(postId, userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessages.Remove,
  })
  @Delete(LikesPath.Delete)
  public async remove(@Param('postId') postId:string, @Body('userId') userId:string) {
    return await this.likesService.delete(postId, userId);
  }
}
