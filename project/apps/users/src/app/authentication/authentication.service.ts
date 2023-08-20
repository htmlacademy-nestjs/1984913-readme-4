import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthError, DEFAULT_AMOUNT } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { TokenPayload, User } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, name, password } = dto;

    const blogUser = {
      email,
      name,
      avatar: '',
      passwordHash: '',
      postsCount: DEFAULT_AMOUNT,
      subscribersCount: DEFAULT_AMOUNT
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthError.UserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    return this.blogUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.NotFound);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.PasswordWrong);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      name: user.name
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  public async changePassword(id:string, dto: ChangePasswordDto) {
    const {newPassword} = dto;
    const blogUser = await this.getUser(id);
    const userEntity = await new BlogUserEntity(blogUser).setPassword(newPassword)
    return this.blogUserRepository.update(id, userEntity);
  }
}
