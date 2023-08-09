import { Comment } from "@prisma/client";
import { IComment } from '@project/shared/app-types';

export function adaptPrismaComment(prismaComment: Comment | null): IComment {
  if (prismaComment) {
    const comment = {
      ...prismaComment,
      createdDate: prismaComment.createdDate.toISOString(),
      _userId:prismaComment.userId,
    };
    return comment;
  }
  return null;
}
