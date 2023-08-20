import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User registration date',
  })
  @Expose({ name: 'createdAt'})
  @Transform(({obj}) => obj.createdAt.toString())
  public createdAt: string;

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
