import { Req, Controller, HttpStatus, Param, Post, Get, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { API_TAG_NAME, LikesMessages, LikesPath } from './like.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { LikeRdo } from './rdo/like.rdo';
import { RequestWithUserPayload } from '@project/shared/app-types';

@ApiTags(API_TAG_NAME)
@Controller(LikesPath.Main)
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: LikesMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @Post(LikesPath.Id)
  public async changeLikeStatus( @Param('postId') id:number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const newLike = await this.likesService.changeLikePublication(id, userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessages.Show,
  })
  @Get(LikesPath.Id)
  public async showLikes(@Param('postId') id:number) {
    const likeInfo = await this.likesService.findByPostId(id);
    return fillObject(LikeRdo, likeInfo);
  }
}
