import { Module } from '@nestjs/common';
import { ConfigBlogModule } from '@project/config/config-blog';
import { PublicationModule } from './publication/publication.module';
import { BlogListModule } from './blog-list/blog-list.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PublicationModule, BlogListModule, PrismaModule, CommentsModule, LikesModule, ConfigBlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
