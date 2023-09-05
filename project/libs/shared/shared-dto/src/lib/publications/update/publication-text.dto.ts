import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { PublicationAnnouncementLength, PublicationTitleLength, TextPublicationLength } from "../publication-dto.constant";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePublicationTextDto extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @IsString()
  @IsOptional()
  @MinLength(TextPublicationLength.Min)
  @MaxLength(TextPublicationLength.Max)
  public text?: string;

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
    description: 'Announcement of post',
    example: 'Text'
  })
  @IsString()
  @IsOptional()
  @MinLength(PublicationAnnouncementLength.Min)
  @MaxLength(PublicationAnnouncementLength.Max)
  public announcement?: string;
}
