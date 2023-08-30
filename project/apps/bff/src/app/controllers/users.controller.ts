import { Body, Req, Get, Param, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AuthPath } from '../app.constant';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from '@project/shared/shared-dto';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Post(AuthPath.Register)
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AuthPath.Register}`, createUserDto);
    return data;
  }

  @Post(AuthPath.Login)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AuthPath.Login}`, loginUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get(AuthPath.Id)
  public async show(@Req() req:Request, @Param('id') id: MongoidValidationPipe) {
    const { data: userData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    const { data: postsData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}?user=${id}`);
    const postsCount = postsData.length;
    return { ...userData, postsCount }
  }

  @UseGuards(CheckAuthGuard)
  @Post(AuthPath.ChangePassword)
  public async changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AuthPath.ChangePassword}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Post(AuthPath.Refresh)
  public async refreshtoken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AuthPath.Refresh}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

}
