import { Publication } from "./publication.interface";

export interface QuotePublication extends Publication {
  text: string;
  author: string;
}
