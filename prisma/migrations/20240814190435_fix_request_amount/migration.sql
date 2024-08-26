/*
  Warnings:

  - You are about to drop the column `amount` on the `requests` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `requests` table. All the data in the column will be lost.
  - Added the required column `note` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" DROP COLUMN "amount",
DROP COLUMN "name",
ADD COLUMN     "note" TEXT NOT NULL,
ALTER COLUMN "interval_count" DROP DEFAULT;

-- AlterTable
ALTER TABLE "requestusers" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
