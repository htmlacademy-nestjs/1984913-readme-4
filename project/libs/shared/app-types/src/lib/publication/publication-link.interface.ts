import { Publication } from "./publication.interface.js";

export interface LinkPublication extends Publication {
  link: string;
  description?: string;
}
