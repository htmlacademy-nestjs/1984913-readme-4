import { Tag } from "./tag.interface";

export interface TextPublication {
  title: string;
  anonuncement: string;
  text: string;
  tags?:Tag[];
}
