import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [BlogUserModule,
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: getJwtOptions
  }),
  NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
})
export class AuthenticationModule {}
