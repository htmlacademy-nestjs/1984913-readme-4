import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsOptional } from "class-validator";

export class UpdatePhotoPublicationDto  extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Publication photo',
    example: 'example.jpg'
  })
  @IsOptional()
  public photo?: string;
}
