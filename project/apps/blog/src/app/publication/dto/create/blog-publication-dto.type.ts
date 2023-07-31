import { CreateLinkPublicationDto } from "./publication-link.dto";
import { CreatePhotoPublicationDto } from "./publication-photo.dto";
import { CreateQuotePublicationDto } from "./publication-quote.dto";
import { CreateTextPublicationDto } from "./publication-text.dto";
import { CreateVideoPublicationDto } from "./publication-video.dto";

export type CreateBlogPublicationDto = CreateLinkPublicationDto | CreatePhotoPublicationDto | CreateQuotePublicationDto | CreateTextPublicationDto | CreateVideoPublicationDto;
