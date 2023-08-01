import { ApiProperty } from "@nestjs/swagger";
import { CreatePublicationDto } from "./publication.dto";

export class CreateTextPublicationDto extends CreatePublicationDto{
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  public text: string;
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  public title: string;
  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  public announcement: string;
}
