import { ApiProperty } from "@nestjs/swagger";
import { CreatePublicationDto } from "./publication.dto";
import { IsString, MaxLength, MinLength } from "class-validator";
import { PublicationAuthorLength, QuotePublicationLength } from "../publication-dto.constant";

export class CreatePublicationQuoteDto extends CreatePublicationDto {
  @ApiProperty({
    description: 'Text of publication  quote',
    example: 'Quote'
  })
  @IsString()
  @MinLength(QuotePublicationLength.Min)
  @MaxLength(QuotePublicationLength.Max)
  public text: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  @IsString()
  @MinLength(PublicationAuthorLength.Min)
  @MaxLength(PublicationAuthorLength.Max)
  public author: string;

}
