import { Module } from '@nestjs/common';
import { BlogListController } from './blog-list.controller';
import { BlogListService } from './blog-list.service';
import { PublicationModule } from '../publication/publication.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';

@Module({
  imports: [PublicationModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  controllers: [BlogListController],
  providers: [BlogListService, JwtAccessStrategy],
})
export class BlogListModule {}
