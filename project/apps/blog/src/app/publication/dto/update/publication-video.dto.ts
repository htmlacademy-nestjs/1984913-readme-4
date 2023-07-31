import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";

export class UpdateVideoPublicationDto extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  public title?: string;
  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  public link?: string;
}
