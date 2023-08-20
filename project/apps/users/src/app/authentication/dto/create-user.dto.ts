import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthError, UserNameLength, UserPasswordLength } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique user email address',
    example: 'test@test.ru'
  })
  @IsEmail({}, { message: AuthError.InvalidEmail})
  public email: string;
  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'John Doe'
  })
  @IsString()
  @MinLength(UserNameLength.Min)
  @MaxLength(UserNameLength.Max)
  public name: string;
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password: string;
}
