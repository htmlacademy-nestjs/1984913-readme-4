import { Tag } from "./tag.interface";

export interface VideoPublication {
  title: string;
  link: string;
  tags?:Tag[];
}
