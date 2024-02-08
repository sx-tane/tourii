-- CreateTable
CREATE TABLE "GoshuinReservation" (
    "gohsuinId" TEXT NOT NULL,
    "goshuinName" TEXT NOT NULL,
    "reservationDate" TIMESTAMP(3) NOT NULL,
    "reservationTime" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "reservationStatus" TEXT NOT NULL,

    CONSTRAINT "GoshuinReservation_pkey" PRIMARY KEY ("gohsuinId")
);
