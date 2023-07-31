import { ApiProperty } from '@nestjs/swagger';
import { PublicationRdo } from './publication.rdo';
import { Expose } from 'class-transformer';

export class VideoPublicationRdo extends PublicationRdo {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  @Expose()
  public link: string;
}
