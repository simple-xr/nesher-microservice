-- CreateTable
CREATE TABLE "Scenes" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "glb" TEXT NOT NULL,

    CONSTRAINT "Scenes_pkey" PRIMARY KEY ("id")
);
