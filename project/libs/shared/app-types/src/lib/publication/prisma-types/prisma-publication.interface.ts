type PrismaPublicationType = "link" | "photo" | "text" | "video" | "quote"
type PrismaPublicationStatus = "draft" | "posted"

export interface PrismaPublication {
  postId: number;
  userId: string;
  originUserId: string;
  originId: number;
  type: PrismaPublicationType;
  createdDate: Date;
  postedDate: Date;
  status: PrismaPublicationStatus;
  isReposted: boolean;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  link: string;
  description: string;
  photo: string;
  text: string;
  author: string;
  title: string;
  announcement: string;
}
