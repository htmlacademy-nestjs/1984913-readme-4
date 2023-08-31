import { BlogPublication } from "@project/shared/app-types";

export class SendNewsletterDto {
  public id: string;
  public email: string;
  public posts: BlogPublication[];
}
