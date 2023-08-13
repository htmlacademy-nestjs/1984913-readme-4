import { Publication } from "@project/shared/app-types";
import { fillObject } from "@project/util/util-core";
import { LinkPublicationRdo } from "../rdo/publication-link.rdo";
import { PhotoPublicationRdo } from "../rdo/publication-photo.rdo";
import { QuotePublicationRdo } from "../rdo/publication-quote.rdo";
import { TextPublicationRdo } from "../rdo/publication-text.rdo";
import { VideoPublicationRdo } from "../rdo/publication-video.rdo";
import { PublicationType } from "@prisma/client";

export function adaptRdoPublication(publication: Publication) {
  switch (publication.type) {
    case PublicationType.link:
      return fillObject(LinkPublicationRdo, publication);
    case PublicationType.photo:
      return fillObject(PhotoPublicationRdo, publication);
    case PublicationType.quote:
      return fillObject(QuotePublicationRdo, publication);
    case PublicationType.text:
      return fillObject(TextPublicationRdo, publication);
    case PublicationType.video:
      return fillObject(VideoPublicationRdo, publication);
    }
}
