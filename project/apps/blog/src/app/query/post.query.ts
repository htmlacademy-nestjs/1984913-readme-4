import { IsIn, IsNumber,IsEnum,IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultPostsLimit, DefaultSortParam } from '../blog-list/blog-list.constant';
import { PublicationType } from '@project/shared/app-types';

export class PostQuery {
  @Transform(({ value } ) => +value || DefaultPostsLimit.Query)
  @IsNumber()
  @IsOptional()
  public limit = DefaultPostsLimit.Query;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsString()
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
