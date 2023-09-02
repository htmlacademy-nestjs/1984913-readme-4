import { ApiProperty } from '@nestjs/swagger';
import { PublicationStatus, PublicationType } from '@project/shared/app-types';
import { ArrayMaxSize, IsEnum, IsOptional, Matches, MaxLength, MinLength, NotContains } from 'class-validator';
import { PublicationsError, RegExpPattern, TagDefaultParam } from "../publication-dto.constant";

export class UpdatePublicationDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  @IsEnum(PublicationType)
  public type: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'posted'
  })
  @IsOptional()
  @IsEnum(PublicationStatus)
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  @IsOptional()
  @NotContains(' ', {each:true, message: PublicationsError.SpacesInTag})
  @Matches(RegExpPattern.Tag, {each:true, message:PublicationsError.WrongTagStart})
  @MinLength(TagDefaultParam.MinLength, {each:true})
  @MaxLength(TagDefaultParam.MaxLength, {each:true})
  @ArrayMaxSize(TagDefaultParam.Amount)
  public tags?:string[];
}
