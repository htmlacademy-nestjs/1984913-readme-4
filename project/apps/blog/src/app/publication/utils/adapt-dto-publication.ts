import { plainToInstance } from "class-transformer";
import { CreatePublicationLinkDto, CreatePublicationPhotoDto, CreatePublicationQuoteDto, CreatePublicationTextDto, CreatePublicationVideoDto , CreateBlogPublicationDto,UpdatePublicationLinkDto, UpdatePublicationPhotoDto, UpdatePublicationQuoteDto, UpdatePublicationTextDto,UpdatePublicationVideoDto,UpdateBlogPublicationDto  } from "@project/shared/shared-dto";
import { PublicationType } from "@project/shared/app-types";

export function adaptCreateDtoPublication(dto: CreateBlogPublicationDto) {
  switch (dto.type) {
    case PublicationType.Link:
      return plainToInstance(CreatePublicationLinkDto, dto);
    case PublicationType.Photo:
      return plainToInstance(CreatePublicationPhotoDto, dto);
    case PublicationType.Quote:
      return plainToInstance(CreatePublicationQuoteDto, dto);
    case PublicationType.Text:
      return plainToInstance(CreatePublicationTextDto, dto);
    case PublicationType.Video:
      return plainToInstance(CreatePublicationVideoDto, dto);
  }
}


export function adaptUpdateDtoPublication(dto: UpdateBlogPublicationDto) {
  switch (dto.type) {
    case PublicationType.Link:
      return plainToInstance(UpdatePublicationLinkDto, dto);
    case PublicationType.Photo:
      return plainToInstance(UpdatePublicationPhotoDto, dto);
    case PublicationType.Quote:
      return plainToInstance(UpdatePublicationQuoteDto, dto);
    case PublicationType.Text:
      return plainToInstance(UpdatePublicationTextDto, dto);
    case PublicationType.Video:
      return plainToInstance(UpdatePublicationVideoDto, dto);
  }
}
