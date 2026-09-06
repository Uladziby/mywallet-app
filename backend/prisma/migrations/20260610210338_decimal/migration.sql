/*
  Warnings:

  - You are about to alter the column `change` on the `asset` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "asset" ALTER COLUMN "change" SET DATA TYPE DECIMAL(10,2);
