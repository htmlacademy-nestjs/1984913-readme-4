import { PublicationType, PublicationStatus } from '@prisma/client';

export interface Publication {
  _id?: number;
  _userId?: string;
  _originUserId?: string;
  _originId?: number;
  type: PublicationType;
  createdDate: string;
  postedDate: string;
  status: PublicationStatus;
  isReposted: boolean;
  tags?: string[];
  likesCount: number;
  commentsCount: number;
}
