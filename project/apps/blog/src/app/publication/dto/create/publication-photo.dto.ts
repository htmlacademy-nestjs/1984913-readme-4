import { CreatePublicationDto } from "./publication.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPublicationDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Publication photo',
    example: 'example.jpg'
  })
  public photo: string;
}
