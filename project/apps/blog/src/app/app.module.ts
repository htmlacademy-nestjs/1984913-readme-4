import { Module } from '@nestjs/common';

import { PublicationModule } from './publication/publication.module';
import { BlogListModule } from './blog-list/blog-list.module';

@Module({
  imports: [PublicationModule, BlogListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
