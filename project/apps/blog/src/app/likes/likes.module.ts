import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikeRepository } from './like.repository';
import { PublicationModule } from '../publication/publication.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
@Module({
  imports: [
    PublicationModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [LikesController],
  providers: [LikesService, LikeRepository, JwtAccessStrategy],
  exports: [LikeRepository],
})
export class LikesModule {}
