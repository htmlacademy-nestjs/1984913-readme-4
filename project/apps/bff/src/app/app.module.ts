import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { BlogController } from './controllers/blog.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCLientParam } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout:HttpCLientParam.Timeout,
      maxRedirects:HttpCLientParam.MaxRedirects
    })
  ],
  controllers: [
    UsersController,
    BlogController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
