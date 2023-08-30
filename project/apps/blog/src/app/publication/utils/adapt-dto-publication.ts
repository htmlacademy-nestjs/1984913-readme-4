import { plainToInstance } from "class-transformer";
import { CreateLinkPublicationDto, CreatePhotoPublicationDto, CreateQuotePublicationDto, CreateTextPublicationDto, CreateVideoPublicationDto , CreateBlogPublicationDto } from "@project/shared/shared-dto";
import { PublicationType } from "@project/shared/app-types";
import { UpdateLinkPublicationDto } from "../../../../../../libs/shared/shared-dto/src/lib/publications/update/publication-link.dto";
import { UpdatePhotoPublicationDto } from "../../../../../../libs/shared/shared-dto/src/lib/publications/update/publication-photo.dto";
import { UpdateQuotePublicationDto } from "../../../../../../libs/shared/shared-dto/src/lib/publications/update/publication-quote.dto";
import { UpdateTextPublicationDto } from "../../../../../../libs/shared/shared-dto/src/lib/publications/update/publication-text.dto";
import { UpdateVideoPublicationDto } from "../../../../../../libs/shared/shared-dto/src/lib/publications/update/publication-video.dto";
import { UpdateBlogPublicationDto } from "../../../../../../libs/shared/shared-dto/src/lib/publications/update/blog-publication-dto.type";

export function adaptCreateDtoPublication(dto: CreateBlogPublicationDto) {
  switch (dto.type) {
    case PublicationType.Link:
      return plainToInstance(CreateLinkPublicationDto, dto);
    case PublicationType.Photo:
      return plainToInstance(CreatePhotoPublicationDto, dto);
    case PublicationType.Quote:
      return plainToInstance(CreateQuotePublicationDto, dto);
    case PublicationType.Text:
      return plainToInstance(CreateTextPublicationDto, dto);
    case PublicationType.Video:
      return plainToInstance(CreateVideoPublicationDto, dto);
  }
}


export function adaptUpdateDtoPublication(dto: UpdateBlogPublicationDto) {
  switch (dto.type) {
    case PublicationType.Link:
      return plainToInstance(UpdateLinkPublicationDto, dto);
    case PublicationType.Photo:
      return plainToInstance(UpdatePhotoPublicationDto, dto);
    case PublicationType.Quote:
      return plainToInstance(UpdateQuotePublicationDto, dto);
    case PublicationType.Text:
      return plainToInstance(UpdateTextPublicationDto, dto);
    case PublicationType.Video:
      return plainToInstance(UpdateVideoPublicationDto, dto);
  }
}
