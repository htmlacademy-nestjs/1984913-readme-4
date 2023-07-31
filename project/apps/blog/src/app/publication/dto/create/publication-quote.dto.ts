import { ApiProperty } from "@nestjs/swagger";
import { CreatePublicationDto } from "./publication.dto";

export class CreateQuotePublicationDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Text of publication  quote',
    example: 'Quote'
  })
  public text: string;
  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  public author: string;

}
