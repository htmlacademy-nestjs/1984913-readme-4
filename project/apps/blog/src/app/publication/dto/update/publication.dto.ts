import { ApiProperty } from '@nestjs/swagger';

export class UpdatePublicationDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  public type?: string;
  @ApiProperty({
    description: 'Status of post',
    example: 'posted'
  })
  public status?: string;
  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  public tags?:string[];
}
