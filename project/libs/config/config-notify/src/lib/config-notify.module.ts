import { Module } from '@nestjs/common';
import { ENV_NOTIFY_FILE_PATH } from './config-notify.constant';
import notifyConfig from './config/notify.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_NOTIFY_FILE_PATH
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigNotifyModule {}
