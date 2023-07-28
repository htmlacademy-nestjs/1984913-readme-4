import { ApiProperty } from "@nestjs/swagger";
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: '1'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Commented post ID',
    example: '1'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Author ID comment',
    example: '1'
  })
  @Expose({ name: '_userId' })
  public userId: string;

  @ApiProperty({
    description: 'Comment post date',
  })
  @Expose()
  public createdDate: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Comment text'
  })
  @Expose()
  public text: string;
}
