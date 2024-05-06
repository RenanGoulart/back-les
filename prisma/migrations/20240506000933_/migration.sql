-- DropForeignKey
ALTER TABLE "OrderCard" DROP CONSTRAINT "OrderCard_orderId_fkey";

-- AddForeignKey
ALTER TABLE "OrderCard" ADD CONSTRAINT "OrderCard_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
