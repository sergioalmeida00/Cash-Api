/*
  Warnings:

  - You are about to drop the `trasaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "trasaction" DROP CONSTRAINT "trasaction_credited_account_id_fkey";

-- DropForeignKey
ALTER TABLE "trasaction" DROP CONSTRAINT "trasaction_debited_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_account_id_fkey";

-- DropTable
DROP TABLE "trasaction";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(70) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credited_account_id" TEXT NOT NULL,
    "debited_account_id" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_account_id_key" ON "users"("account_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_credited_account_id_fkey" FOREIGN KEY ("credited_account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_debited_account_id_fkey" FOREIGN KEY ("debited_account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
