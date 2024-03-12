-- CreateTable
CREATE TABLE "Points" (
    "driverId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("driverId")
);
