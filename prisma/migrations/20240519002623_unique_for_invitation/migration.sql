/*
  Warnings:

  - A unique constraint covering the columns `[invite]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_invite_key" ON "Application"("invite");
