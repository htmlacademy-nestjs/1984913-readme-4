import { BadRequestException, PipeTransform } from "@nestjs/common";
import { PublicationType } from "@project/shared/app-types";
import { CreateBlogPublicationDto, UpdateBlogPublicationDto } from "@project/shared/shared-dto";
import { PublicationsError } from "../publication.constant";

export class TypePostValidationPipe implements PipeTransform {
  async transform(dto: CreateBlogPublicationDto | UpdateBlogPublicationDto) {
    if(!dto.type || !Object.values<string>(PublicationType).includes(dto.type)){
      throw new BadRequestException(PublicationsError.WrongType)
    }
    return dto;
  }
}
