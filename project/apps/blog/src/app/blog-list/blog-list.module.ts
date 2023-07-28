import { Module } from '@nestjs/common';
import { BlogListController } from './blog-list.controller';
import { BlogListService } from './blog-list.service';

@Module({
  controllers: [BlogListController],
  providers: [BlogListService],
})
export class BlogListModule {}
