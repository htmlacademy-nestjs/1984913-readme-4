import { Body, Req, Get, Param, Controller, Post, UseFilters, UseGuards, UploadedFile, UseInterceptors, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AppPath, ControllerName, ImageType, UserMessages } from '../app.constant';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from '@project/shared/shared-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import FormData from 'form-data'
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerName.User)
@Controller(ControllerName.User)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @ApiResponse({
    status:HttpStatus.CREATED,
    description:UserMessages.Register
  })
  @Post(AppPath.Register)
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Register}`, createUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.Login
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserMessages.InvalidData,
  })
  @Post(AppPath.Login)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Login}`, loginUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserMessages.NotFound
  })
  @Get(AppPath.Id)
  public async show(@Param('id') id: MongoidValidationPipe) {
    const { data: userData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    const { data: postsData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}?user=${id}`);
    const postsCount = postsData.length;
    return { ...userData, postsCount }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.PasswordChanged
  })
  @UseGuards(CheckAuthGuard)
  @Post(AppPath.ChangePassword)
  public async changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.ChangePassword}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.Refresh
  })
  @Post(AppPath.Refresh)
  public async refreshtoken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Refresh}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.AvatarAdded
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Upload}-${ImageType.Avatar}`)
  @UseInterceptors(FileInterceptor(ImageType.Avatar))
  public async uploadAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData()
    formData.append(ImageType.Avatar, Buffer.from(file.buffer), file.originalname)
    const { data:avatarData } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${ImageType.Avatar}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Upload}-${ImageType.Avatar}`, {avatarId:avatarData.id}, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

}
