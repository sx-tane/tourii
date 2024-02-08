/*
  Warnings:

  - Added the required column `redemptionDate` to the `GoshuinReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoshuinReservation" ADD COLUMN     "redemptionDate" TIMESTAMP(3) NOT NULL;
