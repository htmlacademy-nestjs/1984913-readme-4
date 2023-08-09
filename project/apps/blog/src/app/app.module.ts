import { Module } from '@nestjs/common';

import { PublicationModule } from './publication/publication.module';
import { BlogListModule } from './blog-list/blog-list.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PublicationModule, BlogListModule, PrismaModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
