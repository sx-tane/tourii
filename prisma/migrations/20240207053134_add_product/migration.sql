-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" TEXT,
    "bungoOnoArea" TEXT,
    "areaColor" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);
