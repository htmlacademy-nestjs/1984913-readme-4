import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { Optional } from "@nestjs/common";

export class UpdateTextPublicationDto extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @Optional()
  public text: string;
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @Optional()
  public title: string;
  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  @Optional()
  public announcement: string;
}
