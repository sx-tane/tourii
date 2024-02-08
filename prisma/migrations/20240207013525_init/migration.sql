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

-- CreateTable
CREATE TABLE "ExperiencePurchase" (
    "id" SERIAL NOT NULL,
    "participants" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "totalPurchase" INTEGER NOT NULL,

    CONSTRAINT "ExperiencePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchandisePurchase" (
    "id" SERIAL NOT NULL,
    "itemNumber" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "totalPurchase" INTEGER NOT NULL,

    CONSTRAINT "MerchandisePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    "experiencePurchaseId" INTEGER,
    "merchandisePurchaseId" INTEGER,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_experiencePurchaseId_fkey" FOREIGN KEY ("experiencePurchaseId") REFERENCES "ExperiencePurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_merchandisePurchaseId_fkey" FOREIGN KEY ("merchandisePurchaseId") REFERENCES "MerchandisePurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
