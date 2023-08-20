import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { UpdateBlogPublicationDto } from "../dto/update/blog-publication-dto.type";
import { validate } from "class-validator";
import { adaptUpdateDtoPublication } from "../utils/adapt-dto-publication";
import { VALIDATION_ARGUMENT_TYPE } from "../publication.constant";

export class UpdatePostValidationPipe implements PipeTransform {
  async transform(dto: UpdateBlogPublicationDto, { type }: ArgumentMetadata) {
    if (type === VALIDATION_ARGUMENT_TYPE) {
      let errors = [];
      const post = adaptUpdateDtoPublication(dto)
      errors = errors.concat(await validate(post, { validationError: { target: false }}));
      if (errors.length > 0) {
          throw new BadRequestException(errors)
        }
    }
    return dto;
  }
}
