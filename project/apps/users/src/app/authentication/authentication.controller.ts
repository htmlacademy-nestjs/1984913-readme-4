import { Body, Req, Controller, Get, HttpStatus,HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { API_TAG_NAME, AuthError, AuthMessages, AuthPath } from './authentication.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserInfoRdo } from './rdo/user-info.rdo';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NotifyService } from '../notify/notify.service';
import { RequestWithUser } from '@project/shared/app-types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags(API_TAG_NAME)
@Controller(AuthPath.Main)
  export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService,
      private readonly notifyService: NotifyService
    ) {}

    @ApiResponse({
      status:HttpStatus.CREATED,
      description:AuthMessages.Register
    })
    @Post(AuthPath.Register)
    public async create(@Body() dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      const { email, name } = newUser;
      await this.notifyService.registerSubscriber({ email, name })
      return fillObject(UserRdo, newUser);
    }

    @ApiResponse({
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.Login
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: AuthError.InvalidData,
    })
    @UseGuards(LocalAuthGuard)
    @Post(AuthPath.Login)
    public async login(@Req() {user}: RequestWithUser) {
    return await this.authService.createUserToken(user);
    }

    @ApiResponse({
      type: UserInfoRdo,
      status: HttpStatus.OK,
      description: AuthMessages.UserFound
    })
    @UseGuards(JwtAuthGuard)
    @Get(AuthPath.Id)
    public async show(@Param('id', MongoidValidationPipe) id: string) {
      const existUser = await this.authService.getUser(id);
      return fillObject(UserInfoRdo, existUser);
    }

    @ApiResponse({
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.PasswordChanged
    })
    @UseGuards(JwtAuthGuard)
    @Post(AuthPath.ChangePassword)
    public async changePassword(@Param('id', MongoidValidationPipe) id: string, @Body() dto:ChangePasswordDto) {
    return this.authService.changePassword(id, dto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Get a new access/refresh tokens'
    })
    @UseGuards(JwtRefreshGuard)
    public async refreshToken(@Req() { user }: RequestWithUser) {
      return this.authService.createUserToken(user);
    }

  }

