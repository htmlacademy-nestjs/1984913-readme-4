import { ApiProperty } from '@nestjs/swagger';
import { PublicationRdo } from './publication.rdo';
import { Expose } from 'class-transformer';

export class LinkPublicationRdo extends PublicationRdo {
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Description of publication  link',
    example: 'Description'
  })
  @Expose()
  public description: string;
}
