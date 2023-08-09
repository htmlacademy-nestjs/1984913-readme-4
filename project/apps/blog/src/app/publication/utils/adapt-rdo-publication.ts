import { Publication, PublicationType } from "@project/shared/app-types";
import { fillObject } from "@project/util/util-core";
import { LinkPublicationRdo } from "../rdo/publication-link.rdo";
import { PhotoPublicationRdo } from "../rdo/publication-photo.rdo";
import { QuotePublicationRdo } from "../rdo/publication-quote.rdo";
import { TextPublicationRdo } from "../rdo/publication-text.rdo";
import { VideoPublicationRdo } from "../rdo/publication-video.rdo";

export function adaptRdoPublication(publication: Publication) {
  switch (publication.type) {
    case PublicationType.Link:
      return fillObject(LinkPublicationRdo, publication);
    case PublicationType.Photo:
      return fillObject(PhotoPublicationRdo, publication);
    case PublicationType.Quote:
      return fillObject(QuotePublicationRdo, publication);
    case PublicationType.Text:
      return fillObject(TextPublicationRdo, publication);
    case PublicationType.Video:
      return fillObject(VideoPublicationRdo, publication);
    }
}
