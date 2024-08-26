/*
  Warnings:

  - You are about to drop the column `request_user_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requestusers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payee_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payer_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pool_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_venmo_id_fkey";

-- DropForeignKey
ALTER TABLE "requestusers" DROP CONSTRAINT "requestusers_request_id_fkey";

-- DropForeignKey
ALTER TABLE "requestusers" DROP CONSTRAINT "requestusers_venmo_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_request_user_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "request_user_id",
ADD COLUMN     "payee_id" TEXT NOT NULL,
ADD COLUMN     "payer_id" TEXT NOT NULL,
ADD COLUMN     "pool_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "requests";

-- DropTable
DROP TABLE "requestusers";

-- CreateTable
CREATE TABLE "pools" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "interval" "Interval" NOT NULL,
    "interval_count" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venmo_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poolusers" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "last_sent" TIMESTAMP(3),
    "pool_id" TEXT NOT NULL,
    "venmo_id" TEXT NOT NULL,

    CONSTRAINT "poolusers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_venmo_id_fkey" FOREIGN KEY ("venmo_id") REFERENCES "venmos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poolusers" ADD CONSTRAINT "poolusers_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poolusers" ADD CONSTRAINT "poolusers_venmo_id_fkey" FOREIGN KEY ("venmo_id") REFERENCES "venmos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "venmos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "venmos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
