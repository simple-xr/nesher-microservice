/*
  Warnings:

  - The `cor` column on the `furnitures` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "furnitures" DROP COLUMN "cor",
ADD COLUMN     "cor" TEXT[];
