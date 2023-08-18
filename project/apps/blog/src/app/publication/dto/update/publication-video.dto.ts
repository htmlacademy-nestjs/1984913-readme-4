import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsString, MaxLength, MinLength } from "class-validator";
import { PublicationTitleLength } from "../../publication.constant";

export class UpdateVideoPublicationDto extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @MinLength(PublicationTitleLength.Min)
  @MaxLength(PublicationTitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  @IsString()
  public link?: string;
}
