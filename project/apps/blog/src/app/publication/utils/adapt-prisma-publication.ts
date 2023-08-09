import { Publication } from "@prisma/client";
import { BlogPublication, PublicationStatus, PublicationType } from "@project/shared/app-types";

export function adaptPrismaPublication(prismaPublication: Publication | null): BlogPublication {
  if (prismaPublication) {
    const publication = {
      ...prismaPublication,
      createdDate: prismaPublication.createdDate.toISOString(),
      postedDate: prismaPublication.postedDate.toISOString(),
      type: prismaPublication.type as PublicationType,
      status: prismaPublication.status as PublicationStatus,
    };
    return publication;
  }
  return null;
}
