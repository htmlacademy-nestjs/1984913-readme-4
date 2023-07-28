import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Commented post ID',
    example: '1'
  })
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Comment text'
  })
  public text: string;
}
