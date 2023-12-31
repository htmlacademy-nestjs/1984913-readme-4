import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { LINK_DESCRIPTION_LENGTH } from "../publication-dto.constant";

export class UpdatePublicationLinkDto  extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @IsUrl()
  @IsOptional()
  public link?: string;
  @ApiProperty({
    description: 'Description of publication  link',
    example: 'Description'
  })
  @IsString()
  @IsOptional()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
