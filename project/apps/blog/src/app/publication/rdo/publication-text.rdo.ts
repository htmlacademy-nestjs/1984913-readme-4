import { ApiProperty } from '@nestjs/swagger';
import { PublicationRdo } from './publication.rdo';
import { Expose } from 'class-transformer';

export class TextPublicationRdo extends PublicationRdo {
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  @Expose()
  public announcement: string;
}
