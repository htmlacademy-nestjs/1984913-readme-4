import { BlogPublication } from "@project/shared/app-types";

export class SendNewsletterDto {
  public email: string;
  public posts: BlogPublication[];
}
