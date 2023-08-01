import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";

export class UpdateLinkPublicationDto  extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  public link?: string;
  @ApiProperty({
    description: 'Description of publication  link',
    example: 'Description'
  })
  public description?: string;
}
