import { CreatePublicationDto } from "./publication.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkPublicationDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  public link: string;
  @ApiProperty({
    description: 'Description of publication  link',
    example: 'Description'
  })
  public description?: string;
}
