/*
  Warnings:

  - You are about to drop the column `interval_count` on the `pools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pools" DROP COLUMN "interval_count",
ADD COLUMN     "last_sent" TIMESTAMP(3);
