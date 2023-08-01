import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { AuthError, DEFAULT_AMOUNT } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserMemoryRepository
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
}
