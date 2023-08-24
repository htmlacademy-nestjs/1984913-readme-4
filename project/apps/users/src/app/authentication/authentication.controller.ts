import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { API_TAG_NAME, AuthError, AuthMessages, AuthPath } from './authentication.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserInfoRdo } from './rdo/user-info.rdo';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NotifyService } from '../notify/notify.service';

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
    @Post(AuthPath.Login)
    public async login(@Body() dto: LoginUserDto) {
      const verifiedUser = await this.authService.verifyUser(dto);
      const loggedUser = await this.authService.createUserToken(verifiedUser);
      const userData = Object.assign(verifiedUser, loggedUser)
      return fillObject(LoggedUserRdo, userData);
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
  }

