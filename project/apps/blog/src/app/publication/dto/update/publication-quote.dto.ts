import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";

export class UpdateQuotePublicationDto extends UpdatePublicationDto {
  @ApiProperty({
    description: 'Text of publication  quote',
    example: 'Quote'
  })
  public text?: string;
  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  public author?: string;
}
