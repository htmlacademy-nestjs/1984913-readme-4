import { LinkPublicationEntity } from "./entity/publication-link.entity";
import { PhotoPublicationEntity } from "./entity/publication-photo.entity";
import { QuotePublicationEntity } from "./entity/publication-quote.entity";
import { TextPublicationEntity } from "./entity/publication-text.entity";
import { VideoPublicationEntity } from "./entity/publication-video.entity";

export type BlogPublicationEntity = LinkPublicationEntity | PhotoPublicationEntity | QuotePublicationEntity | TextPublicationEntity | VideoPublicationEntity;
