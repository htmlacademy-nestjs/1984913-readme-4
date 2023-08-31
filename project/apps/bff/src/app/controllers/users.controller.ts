import { Body, Req, Get, Param, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AppPath, ControllerName } from '../app.constant';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from '@project/shared/shared-dto';

@Controller(ControllerName.User)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Post(AppPath.Register)
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Register}`, createUserDto);
    return data;
  }

  @Post(AppPath.Login)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Login}`, loginUserDto);
    return data;
  }

  @Get(AppPath.Id)
  public async show( @Param('id') id: MongoidValidationPipe) {
    const { data: userData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    const { data: postsData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}?user=${id}`);
    const postsCount = postsData.length;
    return { ...userData, postsCount }
  }

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

  @Post(AppPath.Refresh)
  public async refreshtoken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Refresh}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

}
