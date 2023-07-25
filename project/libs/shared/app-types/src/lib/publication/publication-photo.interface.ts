import { Tag } from "./tag.interface";

export interface PhotoPublication {
  photo: string;
  tags?:Tag[];
}
