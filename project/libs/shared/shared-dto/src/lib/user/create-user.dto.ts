import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {EMAIL_ERROR,UserNameLength, UserPasswordLength} from './user-dto.constant'

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique user email address',
    example: 'test@test.ru'
  })
  @IsEmail({}, { message: EMAIL_ERROR})
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

  @ApiProperty({
    description: 'Avatar id from db',
    example: '123456'
  })
  @IsString()
  @IsOptional()
  public avatarId?: string;
}
