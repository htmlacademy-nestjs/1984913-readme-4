import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentMemoryRepository } from './comment-memory.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentMemoryRepository],
  exports: [ CommentMemoryRepository],
})
export class CommentsModule {}
