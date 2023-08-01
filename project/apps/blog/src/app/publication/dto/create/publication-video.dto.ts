import { ApiProperty } from "@nestjs/swagger";
import { CreatePublicationDto } from "./publication.dto";

export class CreateVideoPublicationDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  public title: string;
  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  public link: string;
}
