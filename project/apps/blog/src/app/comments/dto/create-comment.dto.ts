import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Commented publication  ID',
    example: '1'
  })
  public postId: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Comment text'
  })
  public text: string;
}
