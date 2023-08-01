import { LinkPublicationEntity } from "./publication-link.entity";
import { PhotoPublicationEntity } from "./publication-photo.entity";
import { QuotePublicationEntity } from "./publication-quote.entity";
import { TextPublicationEntity } from "./publication-text.entity";
import { VideoPublicationEntity } from "./publication-video.entity";

export type BlogPublicationEntity = LinkPublicationEntity | PhotoPublicationEntity | QuotePublicationEntity | TextPublicationEntity | VideoPublicationEntity;
