import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { CreateBlogPublicationDto } from "../dto/create/blog-publication-dto.type";
import { validate } from "class-validator";
import { adaptCreateDtoPublication } from "../utils/adapt-dto-publication";
import { VALIDATION_ARGUMENT_TYPE } from "../publication.constant";

export class CreatePostValidationPipe implements PipeTransform {
  async transform(dto: CreateBlogPublicationDto, { type }: ArgumentMetadata) {
    if (type === VALIDATION_ARGUMENT_TYPE) {
      let errors = [];
      const post = adaptCreateDtoPublication(dto)
      errors = errors.concat(await validate(post, { validationError: { target: false }}));
      if (errors.length > 0) {
          throw new BadRequestException(errors)
      }
    }
    return dto;
  }
}
