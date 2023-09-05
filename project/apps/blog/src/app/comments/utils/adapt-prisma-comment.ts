import { IComment, PrismaComment } from '@project/shared/app-types';

export function adaptPrismaComment(prismaComment: PrismaComment| null): IComment {
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
