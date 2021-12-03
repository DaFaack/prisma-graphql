-- CreateTable
CREATE TABLE "Meme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "button_normal" TEXT NOT NULL,
    "button_pressed" TEXT NOT NULL,

    CONSTRAINT "Meme_pkey" PRIMARY KEY ("id")
);
