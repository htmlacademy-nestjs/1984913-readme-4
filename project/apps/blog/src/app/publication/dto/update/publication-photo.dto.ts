import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";

export class UpdatePhotoPublicationDto  extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Publication photo',
    example: 'example.jpg'
  })
  public photo?: string;
}
