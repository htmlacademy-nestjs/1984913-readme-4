import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Publication ID'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'User ID'
  })
  @Expose()
  public userId: string;

}
