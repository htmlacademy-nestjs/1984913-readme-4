import { ApiProperty } from "@nestjs/swagger";
import { CreatePublicationDto } from "./publication.dto";
import { IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";
import { PublicationTitleLength, PublicationsError, VIDEO_REGEXP } from "../../publication.constant";

export class CreateVideoPublicationDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @MinLength(PublicationTitleLength.Min)
  @MaxLength(PublicationTitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  @IsUrl()
  @Matches(VIDEO_REGEXP, {message: PublicationsError.WrongSourse})
  public link: string;
}
