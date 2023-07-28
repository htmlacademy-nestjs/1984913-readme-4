import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { AuthPath } from './authentication.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('authentication')
@Controller(AuthPath.Main)
  export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService
    ) {}

    @ApiResponse({
      status:HttpStatus.CREATED,
      description:"User registered successfully"
    })
    @Post(AuthPath.Register)
    public async create(@Body() dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      return fillObject(UserRdo, newUser);
    }

    @ApiResponse({
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: 'Login successfull'
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Email or password is invalid',
    })
    @Post(AuthPath.Login)
    public async login(@Body() dto: LoginUserDto) {
      const verifiedUser = await this.authService.verifyUser(dto);
      return fillObject(LoggedUserRdo, verifiedUser);
    }
    @ApiResponse({
      type: UserRdo,
      status: HttpStatus.OK,
      description: 'User data found'
    })
    @Get(AuthPath.Id)
    public async show(@Param('id') id: string) {
      const existUser = await this.authService.getUser(id);
      return fillObject(UserRdo, existUser);
    }
  }
