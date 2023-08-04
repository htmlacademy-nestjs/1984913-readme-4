import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_USERS_FILE_PATH } from './config-users.constant';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigUsersModule {}
