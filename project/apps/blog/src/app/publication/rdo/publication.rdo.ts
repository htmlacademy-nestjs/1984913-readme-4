import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PublicationRdo {
  @ApiProperty({
    description: 'Unique publication  ID',
    example: '1'
  })
  @Expose({ name: '_id' })
  public id: string;

    @ApiProperty({
    description: 'Unique publication  ID if reposted',
    example: '1'
  })
  @Expose({ name: '_originId' })
  public originId: string;

  @ApiProperty({
    description: 'Publication type',
    example: 'text'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Publication author ID',
    example: '1'
  })
  @Expose({ name: '_userId' })
  public userId: string;

  @ApiProperty({
    description: 'Publication author ID if reposted',
    example: '1'
  })
  @Expose({ name: '_originUserId' })
  public originUserId: string;

  @ApiProperty({
    description: 'Date publication  was created',
  })
  @Expose()
  public createdDate: string;

  @ApiProperty({
    description: 'Date publication  was published',
  })
  @Expose()
  public postedDate: string;

  @ApiProperty({
    description: 'Publication status',
    example: 'posted'
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Reposted status',
    example: false
  })
  @Expose()
  public isReposted: boolean;

  @ApiProperty({
    description: 'Total amount of likes',
    example: '0'
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'Total amount of comments',
    example: '0'
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Tag list',
    example: ['test']
  })
  @Expose()
  public tags: string[];
}
