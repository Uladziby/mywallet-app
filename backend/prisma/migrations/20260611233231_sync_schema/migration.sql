/*
  Warnings:

  - You are about to drop the `assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Title" AS ENUM ('Crypto', 'Bank_Account', 'Cash');

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_assets_user_id_fkey";

-- DropTable
DROP TABLE "assets";

-- CreateTable
CREATE TABLE "user_data" (
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_assets_user_id_fkey" FOREIGN KEY ("assets_user_id") REFERENCES "user_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
