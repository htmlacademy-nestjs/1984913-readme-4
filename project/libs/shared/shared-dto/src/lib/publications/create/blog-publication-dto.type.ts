import { CreatePublicationLinkDto } from "./publication-link.dto";
import { CreatePublicationPhotoDto } from "./publication-photo.dto";
import { CreatePublicationQuoteDto } from "./publication-quote.dto";
import { CreatePublicationTextDto } from "./publication-text.dto";
import { CreatePublicationVideoDto } from "./publication-video.dto";

export type CreateBlogPublicationDto = CreatePublicationLinkDto | CreatePublicationPhotoDto | CreatePublicationQuoteDto | CreatePublicationTextDto | CreatePublicationVideoDto;
