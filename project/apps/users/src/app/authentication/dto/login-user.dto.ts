import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@test.ru'
  })
  public email: string;
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}
