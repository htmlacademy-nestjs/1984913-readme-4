import { ApiProperty } from "@nestjs/swagger";
import { UpdatePublicationDto } from "./publication.dto";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { PublicationAuthorLength, QuotePublicationLength } from "../../publication.constant";

export class UpdateQuotePublicationDto extends UpdatePublicationDto {
  @ApiProperty({
    description: 'Text of publication  quote',
    example: 'Quote'
  })
  @IsString()
  @IsOptional()
  @MinLength(QuotePublicationLength.Min)
  @MaxLength(QuotePublicationLength.Max)
  public text?: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  @IsString()
  @IsOptional()
  @MinLength(PublicationAuthorLength.Min)
  @MaxLength(PublicationAuthorLength.Max)
  public author?: string;
}
