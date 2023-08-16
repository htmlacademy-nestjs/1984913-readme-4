import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AuthError } from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@test.ru'
  })
  @IsEmail({}, { message: AuthError.InvalidEmail})
  public email: string;
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
