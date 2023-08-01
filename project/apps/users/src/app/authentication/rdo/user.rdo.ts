import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'John Doe'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User posts amount',
    example: '0'
  })
  @Expose()
  public postsCount:number;

  @ApiProperty({
    description: 'User subscribers amount',
    example: '0'
  })
  @Expose()
  public subscribersCount:number;
}
