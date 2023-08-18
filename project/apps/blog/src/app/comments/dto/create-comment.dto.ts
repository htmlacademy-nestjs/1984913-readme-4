import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { CommentTextLength } from '../comments.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Commented publication  ID',
    example: '1'
  })
  @IsInt()
  public postId: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Comment text'
  })
  @IsString()
  @MinLength(CommentTextLength.Min)
  @MaxLength(CommentTextLength.Max)
  public text: string;
}
