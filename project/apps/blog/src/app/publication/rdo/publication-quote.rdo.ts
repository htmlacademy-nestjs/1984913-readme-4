import { ApiProperty } from '@nestjs/swagger';
import { PublicationRdo } from './publication.rdo';
import { Expose } from 'class-transformer';

export class PublicationQuoteRdo extends PublicationRdo {
  @ApiProperty({
    description: 'Text of publication  quote',
    example: 'Quote'
  })
  @Expose()
  public quote: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  @Expose()
  public author: string;
}
