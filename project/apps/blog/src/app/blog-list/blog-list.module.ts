import { Module } from '@nestjs/common';
import { BlogListController } from './blog-list.controller';
import { BlogListService } from './blog-list.service';
import { PublicationModule } from '../publication/publication.module';

@Module({
  imports: [PublicationModule],
  controllers: [BlogListController],
  providers: [BlogListService],
})
export class BlogListModule {}
