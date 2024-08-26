/*
  Warnings:

  - A unique constraint covering the columns `[pool_id,venmo_id]` on the table `poolusers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "poolusers_pool_id_venmo_id_key" ON "poolusers"("pool_id", "venmo_id");
