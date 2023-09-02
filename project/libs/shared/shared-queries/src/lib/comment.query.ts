import { IsNumber,IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_COMMENTS_LIMIT } from './query.constant';

export class CommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_COMMENTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENTS_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
