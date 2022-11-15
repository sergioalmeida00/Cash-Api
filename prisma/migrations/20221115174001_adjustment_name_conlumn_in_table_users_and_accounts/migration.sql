/*
  Warnings:

  - You are about to drop the column `accounts_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passaword` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[account_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `debited_account_id` on table `trasaction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `account_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trasaction" DROP CONSTRAINT "trasaction_debited_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_accounts_id_fkey";

-- DropIndex
DROP INDEX "user_accounts_id_key";

-- AlterTable
ALTER TABLE "trasaction" ALTER COLUMN "debited_account_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "accounts_id",
DROP COLUMN "passaword",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "password" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_account_id_key" ON "user"("account_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trasaction" ADD CONSTRAINT "trasaction_debited_account_id_fkey" FOREIGN KEY ("debited_account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
