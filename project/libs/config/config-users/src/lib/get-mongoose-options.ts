import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/util/util-core';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('database.user'),
          password: config.get<string>('database.password'),
          host: config.get<string>('database.host'),
          port: config.get<string>('database.port'),
          authDatabase: config.get<string>('database.authBase'),
          databaseName: config.get<string>('database.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}

