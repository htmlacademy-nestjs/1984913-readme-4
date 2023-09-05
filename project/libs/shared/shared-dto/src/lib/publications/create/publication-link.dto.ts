import { IsString, IsUrl, MaxLength } from "class-validator";
import { CreatePublicationDto } from "./publication.dto";
import { ApiProperty } from '@nestjs/swagger';
import { LINK_DESCRIPTION_LENGTH } from "../publication-dto.constant";

export class CreatePublicationLinkDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @IsUrl()
  public link: string;
  @ApiProperty({
    description: 'Description of publication  link',
    example: 'Description'
  })
  @IsString()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
