import { Publication } from "@project/shared/app-types";
import { fillObject } from "@project/util/util-core";
import { PublicationLinkRdo } from "../rdo/publication-link.rdo";
import { PublicationPhotoRdo } from "../rdo/publication-photo.rdo";
import { PublicationQuoteRdo } from "../rdo/publication-quote.rdo";
import { PublicationTextRdo } from "../rdo/publication-text.rdo";
import { PublicationVideoRdo } from "../rdo/publication-video.rdo";
import { PublicationType } from "@prisma/client";

export function adaptRdoPublication(publication: Publication) {
  switch (publication.type) {
    case PublicationType.link:
      return fillObject(PublicationLinkRdo, publication);
    case PublicationType.photo:
      return fillObject(PublicationPhotoRdo, publication);
    case PublicationType.quote:
      return fillObject(PublicationQuoteRdo, publication);
    case PublicationType.text:
      return fillObject(PublicationTextRdo, publication);
    case PublicationType.video:
      return fillObject(PublicationVideoRdo, publication);
    }
}
