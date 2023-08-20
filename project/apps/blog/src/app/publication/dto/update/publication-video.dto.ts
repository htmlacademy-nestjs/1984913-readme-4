import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";
import { PublicationTitleLength, PublicationsError, VIDEO_REGEXP } from "../../publication.constant";

export class UpdateVideoPublicationDto extends UpdatePublicationDto{
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
  @Matches(VIDEO_REGEXP, {message: PublicationsError.WrongSourse})
    public link?: string;
}
