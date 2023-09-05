import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";
import { PublicationTitleLength, PublicationsError, RegExpPattern } from "../publication-dto.constant";

export class UpdatePublicationVideoDto extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @IsOptional()
  @MinLength(PublicationTitleLength.Min)
  @MaxLength(PublicationTitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  @IsOptional()
  @IsUrl()
  @Matches(RegExpPattern.Video, {message: PublicationsError.WrongSourse})
    public link?: string;
}
