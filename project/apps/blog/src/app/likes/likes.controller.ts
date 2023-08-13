import { Body, Controller, HttpStatus, Param, Post, Get } from '@nestjs/common';
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
  @Post(LikesPath.Id)
  public async changeLikeStatus( @Param('postId') id:string, @Body('userId') userId:string) {
    const postId = parseInt(id, 10);
    const newLike = await this.likesService.changeLikePublication(postId, userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessages.Remove,
  })
  @Get(LikesPath.Id)
  public async showLikes(@Param('postId') id:string) {
    const postId = parseInt(id, 10);
    const likeInfo = await this.likesService.findByPostId(postId);
    return fillObject(LikeRdo, likeInfo);

  }
}
