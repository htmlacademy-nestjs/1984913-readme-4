import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PublicationRdo } from './publication.rdo';

export class PhotoPublicationRdo extends PublicationRdo {
  @ApiProperty({
    description: 'Publication photo',
    example: 'example.jpg'
  })
  @Expose()
  public photo: string;
}
