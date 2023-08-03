import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigName, DEFAULT_ERROR_MESSAGE, DefaultPort } from './config-users.constant';
import { ApplicationConfig } from '../types/app-config.interface';

export default registerAs(ConfigName.App, (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DefaultPort.App.toString(), 10),
  };

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().default(DefaultPort.App),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: ${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});
