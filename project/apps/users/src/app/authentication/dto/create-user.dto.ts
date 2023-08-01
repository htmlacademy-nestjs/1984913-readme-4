import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique user email address',
    example: 'test@test.ru'
  })
  public email: string;
  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'John Doe'
  })
  public name: string;
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}
