/*
  Warnings:

  - You are about to drop the column `candidateId` on the `Application` table. All the data in the column will be lost.
  - Added the required column `candidate_id` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidateId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "candidateId",
ADD COLUMN     "candidate_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
