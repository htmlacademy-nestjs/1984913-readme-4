import { UpdateLinkPublicationDto } from "./publication-link.dto";
import { UpdatePhotoPublicationDto } from "./publication-photo.dto";
import { UpdateQuotePublicationDto } from "./publication-quote.dto";
import { UpdateTextPublicationDto } from "./publication-text.dto";
import { UpdateVideoPublicationDto } from "./publication-video.dto";

export type UpdateBlogPublicationDto = UpdateLinkPublicationDto | UpdatePhotoPublicationDto | UpdateQuotePublicationDto | UpdateTextPublicationDto | UpdateVideoPublicationDto;
