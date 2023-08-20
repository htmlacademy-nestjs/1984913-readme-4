import { plainToInstance } from "class-transformer";
import { CreateLinkPublicationDto } from "../dto/create/publication-link.dto";
import { CreatePhotoPublicationDto } from "../dto/create/publication-photo.dto";
import { CreateQuotePublicationDto } from "../dto/create/publication-quote.dto";
import { CreateTextPublicationDto } from "../dto/create/publication-text.dto";
import { CreateVideoPublicationDto } from "../dto/create/publication-video.dto";
import { CreateBlogPublicationDto } from "../dto/create/blog-publication-dto.type";
import { PublicationType } from "@project/shared/app-types";
import { UpdateLinkPublicationDto } from "../dto/update/publication-link.dto";
import { UpdatePhotoPublicationDto } from "../dto/update/publication-photo.dto";
import { UpdateQuotePublicationDto } from "../dto/update/publication-quote.dto";
import { UpdateTextPublicationDto } from "../dto/update/publication-text.dto";
import { UpdateVideoPublicationDto } from "../dto/update/publication-video.dto";
import { UpdateBlogPublicationDto } from "../dto/update/blog-publication-dto.type";

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
