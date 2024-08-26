-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pool_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "pool_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pools"("id") ON DELETE SET NULL ON UPDATE SET NULL;
