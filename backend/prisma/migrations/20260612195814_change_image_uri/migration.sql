/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `asset` table. All the data in the column will be lost.
  - Added the required column `imageUri` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssetImage" AS ENUM ('bitcoin', 'etherium', 'usd', 'eur');

-- AlterTable
ALTER TABLE "asset" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUri" "AssetImage" NOT NULL;
