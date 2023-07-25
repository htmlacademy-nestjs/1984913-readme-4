import { Tag } from "./tag.interface";

export interface QuotePublication {
  text: string;
  author: string;
  tags?:Tag[];
}
