import { IsIn, IsNumber,IsEnum,IsString,IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POSTS_LIMIT, DefaultSortParam } from '../blog-list/blog-list.constant';
import { PublicationType } from '@project/shared/app-types';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POSTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POSTS_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public user?: string;

  @IsIn(['postedDate', 'likesCount', 'commentsCount'])
  @IsOptional()
  public sortBy?: 'postedDate' | 'likesCount' | 'commentsCount' = DefaultSortParam.Type;

  @IsEnum(PublicationType)
  @IsOptional()
  public type?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DefaultSortParam.Direction;

}
