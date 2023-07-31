
export interface Publication {
  _id?: string;
  _userId?: string;
  _originUserId?: string;
  _originId?: string;
  type: string;
  createdDate?: string;
  postedDate?: string;
  status: string;
  isReposted: boolean;
  tags?: string[];
  likesCount: number;
  commentsCount: number;
}
