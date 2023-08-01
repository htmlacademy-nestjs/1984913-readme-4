import { LinkPublication } from "./publication-link.interface";
import { PhotoPublication } from "./publication-photo.interface";
import { QuotePublication } from "./publication-quote.interface";
import { TextPublication } from "./publication-text.interface";
import { VideoPublication } from "./publication-video.interface";

export type BlogPublication = LinkPublication | PhotoPublication | QuotePublication | TextPublication | VideoPublication
