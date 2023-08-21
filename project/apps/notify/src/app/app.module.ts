import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { OPTION_SPACE_NAME } from './email-subscriber/email-subscriber.constant';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions(OPTION_SPACE_NAME)),
    EmailSubscriberModule,
  ],  controllers: [],
  providers: [],
})
export class AppModule {}
