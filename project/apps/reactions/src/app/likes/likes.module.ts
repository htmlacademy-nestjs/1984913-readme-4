import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikeMemoryRepository } from './like-memory.repository';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikeMemoryRepository],
  exports: [LikeMemoryRepository],
})
export class LikesModule {}
