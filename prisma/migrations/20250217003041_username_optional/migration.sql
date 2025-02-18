/*
  Warnings:

  - Added the required column `quantity` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL;
