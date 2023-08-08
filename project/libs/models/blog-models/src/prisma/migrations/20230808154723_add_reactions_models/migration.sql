-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "post_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "likes" (
    "post_id" INTEGER NOT NULL,
    "liked_by_ids" TEXT[],

    CONSTRAINT "likes_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_post_id_key" ON "likes"("post_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "publications"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "publications"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
