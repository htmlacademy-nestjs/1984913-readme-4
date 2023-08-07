-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('draft', 'posted');

-- CreateTable
CREATE TABLE "Publication" (
    "postId" SERIAL NOT NULL,
    "userId" TEXT,
    "originUserId" TEXT,
    "originId" INTEGER,
    "type" "PublicationType" NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedDate" TIMESTAMP(3) NOT NULL,
    "status" "PublicationStatus" NOT NULL DEFAULT 'posted',
    "isReposted" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "likesCount" INTEGER NOT NULL,
    "commentsCount" INTEGER NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "photo" TEXT,
    "text" TEXT,
    "author" TEXT,
    "title" TEXT,
    "announcement" TEXT,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("postId")
);
