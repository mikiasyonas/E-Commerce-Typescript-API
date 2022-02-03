/*
  Warnings:

  - Made the column `confirmationCode` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "confirmationCode" SET NOT NULL;
