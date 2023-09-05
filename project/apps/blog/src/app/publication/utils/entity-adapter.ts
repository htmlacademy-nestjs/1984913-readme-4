import { PublicationLinkEntity } from "../entity/publication-link.entity";
import { PublicationPhotoEntity } from "../entity/publication-photo.entity";
import { PublicationQuoteEntity } from "../entity/publication-quote.entity";
import { PublicationTextEntity } from "../entity/publication-text.entity";
import { PublicationVideoEntity } from "../entity/publication-video.entity";

export const TypeEntityAdapter = {
  'link': PublicationLinkEntity,
  'photo': PublicationPhotoEntity,
  'quote': PublicationQuoteEntity,
  'text': PublicationTextEntity,
  'video': PublicationVideoEntity
}
