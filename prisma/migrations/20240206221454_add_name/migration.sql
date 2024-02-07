/*
  Warnings:

  - Added the required column `name` to the `GoshuinReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoshuinReservation" ADD COLUMN     "name" TEXT NOT NULL;
