import { Publication, PublicationType } from "@project/shared/app-types";
import { fillObject } from "@project/util/util-core";
import { PublicationLinkRdo } from "../rdo/publication-link.rdo";
import { PublicationPhotoRdo } from "../rdo/publication-photo.rdo";
import { PublicationQuoteRdo } from "../rdo/publication-quote.rdo";
import { PublicationTextRdo } from "../rdo/publication-text.rdo";
import { PublicationVideoRdo } from "../rdo/publication-video.rdo";

export function adaptRdoPublication(publication: Publication) {
  switch (publication.type) {
    case PublicationType.Link:
      return fillObject(PublicationLinkRdo, publication);
    case PublicationType.Photo:
      return fillObject(PublicationPhotoRdo, publication);
    case PublicationType.Quote:
      return fillObject(PublicationQuoteRdo, publication);
    case PublicationType.Text:
      return fillObject(PublicationTextRdo, publication);
    case PublicationType.Video:
      return fillObject(PublicationVideoRdo, publication);
    }
}
