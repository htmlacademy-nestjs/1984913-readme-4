import { IsString } from "class-validator";
import { CreatePublicationDto } from "./publication.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPublicationDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Publication photo id',
    example: '1'
  })
  @IsString()
  public photo: string;
}
