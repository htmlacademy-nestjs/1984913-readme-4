import { registerAs } from '@nestjs/config';
import { JWTConfig } from '@project/shared/app-types';
import * as Joi from 'joi';
import { CONFIG_NAME, DEFAULT_ERROR_MESSAGE } from '../config-blog.constant';

export default registerAs(CONFIG_NAME, (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_AT_SECRET,
    accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
  };

  const validationSchema = Joi.object<JWTConfig>({
    accessTokenSecret: Joi.string().required(),
    accessTokenExpiresIn: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});
