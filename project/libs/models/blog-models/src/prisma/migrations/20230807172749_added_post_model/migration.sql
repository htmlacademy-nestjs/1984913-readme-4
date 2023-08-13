/*
  Warnings:

  - You are about to drop the `Publication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Publication";

-- CreateTable
CREATE TABLE "publications" (
    "post_id" SERIAL NOT NULL,
    "user_id" TEXT,
    "origin_user_id" TEXT,
    "origin_post_id" INTEGER,
    "type" "PublicationType" NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_date" TIMESTAMP(3) NOT NULL,
    "status" "PublicationStatus" NOT NULL DEFAULT 'posted',
    "is_reposted" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "likes_count" INTEGER NOT NULL,
    "comments_count" INTEGER NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "photo" TEXT,
    "text" TEXT,
    "author" TEXT,
    "title" TEXT,
    "announcement" TEXT,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("post_id")
);
