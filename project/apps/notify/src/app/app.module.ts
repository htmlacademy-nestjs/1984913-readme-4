import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { DEFAULT_OPTION_SPACE } from './email-subscriber/email-subscriber.constant';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions(DEFAULT_OPTION_SPACE)),
    EmailSubscriberModule,
  ],  controllers: [],
  providers: [],
})
export class AppModule {}
