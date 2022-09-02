/*
  Warnings:

  - You are about to drop the column `profileId` on the `ProgrammingLanguage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ProgrammingLanguage` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `ProgrammingLanguage` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `SocialMedia` table. All the data in the column will be lost.
  - Added the required column `name` to the `ProgrammingLanguage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProgrammingLanguage" DROP CONSTRAINT "ProgrammingLanguage_profileId_fkey";

-- AlterTable
ALTER TABLE "ProgrammingLanguage" DROP COLUMN "profileId",
DROP COLUMN "url",
DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SocialMedia" DROP COLUMN "username",
ADD COLUMN     "userName" TEXT NOT NULL;
