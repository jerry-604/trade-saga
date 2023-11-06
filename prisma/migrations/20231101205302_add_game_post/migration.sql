-- CreateTable
CREATE TABLE "GamePost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameID" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "GamePost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GamePost" ADD CONSTRAINT "GamePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePost" ADD CONSTRAINT "GamePost_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
