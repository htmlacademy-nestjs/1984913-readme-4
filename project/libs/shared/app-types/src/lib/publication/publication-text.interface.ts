import { Publication } from "./publication.interface";

export interface TextPublication extends Publication {
  title: string;
  anonuncement: string;
  text: string;
}
