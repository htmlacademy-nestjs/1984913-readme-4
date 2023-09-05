import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdatePublicationPhotoDto  extends UpdatePublicationDto{
  @ApiProperty({
    description: 'Publication photo id',
    example: '1'
  })
  @IsString()
  @IsOptional()
  public photo?: string;
}
