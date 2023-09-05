import { ApiProperty } from "@nestjs/swagger";
import { CreatePublicationDto } from "./publication.dto";
import { PublicationAnnouncementLength, PublicationTitleLength, TextPublicationLength } from "../publication-dto.constant";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreatePublicationTextDto extends CreatePublicationDto{
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @IsString()
  @MinLength(TextPublicationLength.Min)
  @MaxLength(TextPublicationLength.Max)
  public text: string;
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @MinLength(PublicationTitleLength.Min)
  @MaxLength(PublicationTitleLength.Max)
  public title: string;
  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  @IsString()
  @MinLength(PublicationAnnouncementLength.Min)
  @MaxLength(PublicationAnnouncementLength.Max)
  public announcement: string;
}
