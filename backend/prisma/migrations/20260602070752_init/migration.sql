-- CreateTable
CREATE TABLE "assets" (
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "assets_user_id" INTEGER NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "place" VARCHAR(100) NOT NULL,
    "balance" INTEGER NOT NULL,
    "change" VARCHAR(20) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "typeCurrency" VARCHAR(100) NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_assets_user_id_fkey" FOREIGN KEY ("assets_user_id") REFERENCES "assets"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
