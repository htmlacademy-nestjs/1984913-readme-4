import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikeRepository } from './like.repository';
import { PublicationModule } from '../publication/publication.module';

@Module({
  imports: [PublicationModule],
  controllers: [LikesController],
  providers: [LikesService, LikeRepository],
  exports: [LikeRepository],
})
export class LikesModule {}
