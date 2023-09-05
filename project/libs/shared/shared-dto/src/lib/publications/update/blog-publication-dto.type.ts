import { UpdatePublicationLinkDto } from "./publication-link.dto";
import { UpdatePublicationPhotoDto } from "./publication-photo.dto";
import { UpdatePublicationQuoteDto } from "./publication-quote.dto";
import { UpdatePublicationTextDto } from "./publication-text.dto";
import { UpdatePublicationVideoDto } from "./publication-video.dto";

export type UpdateBlogPublicationDto = UpdatePublicationLinkDto | UpdatePublicationPhotoDto | UpdatePublicationQuoteDto | UpdatePublicationTextDto | UpdatePublicationVideoDto;
