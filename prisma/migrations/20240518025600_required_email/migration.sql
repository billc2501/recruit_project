/*
  Warnings:

  - Made the column `email` on table `Candidate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "email" SET NOT NULL;
