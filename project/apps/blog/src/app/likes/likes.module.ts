import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikeRepository } from './like.repository';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikeRepository],
  exports: [LikeRepository],
})
export class LikesModule {}
