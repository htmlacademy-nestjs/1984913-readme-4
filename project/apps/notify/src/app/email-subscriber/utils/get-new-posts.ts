import { Subscriber } from "@project/shared/app-types";
import { NewsletterDto } from "../dto/newsletter.dto";
import dayjs from "dayjs";

export const getNewPosts = ({posts, id}:NewsletterDto, {dateNotify}:Subscriber)=> posts.filter((post) => post._userId!==id && dayjs(post.createdDate).isAfter(dateNotify));
