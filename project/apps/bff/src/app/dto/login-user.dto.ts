import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthError, UserPasswordLength } from '../app.constant';

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
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password: string;
}
