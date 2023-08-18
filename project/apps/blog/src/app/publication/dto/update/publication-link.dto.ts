import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsString, MaxLength } from "class-validator";
import { LINK_DESCRIPTION_LENGTH } from "../../publication.constant";

export class UpdateLinkPublicationDto  extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @IsString()
  public link?: string;
  @ApiProperty({
    description: 'Description of publication  link',
    example: 'Description'
  })
  @IsString()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
