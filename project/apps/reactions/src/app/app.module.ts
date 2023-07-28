import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [CommentsModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
