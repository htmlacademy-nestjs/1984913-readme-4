import { ApiProperty } from '@nestjs/swagger';
import { PublicationStatus, PublicationType } from '@project/shared/app-types';
import { IsEnum } from 'class-validator';

export class UpdatePublicationDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  @IsEnum(PublicationType)
  public type?: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'posted'
  })
  @IsEnum(PublicationStatus)
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  public tags?:string[];
}
