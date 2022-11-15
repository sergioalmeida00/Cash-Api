-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(70) NOT NULL,
    "passaword" VARCHAR(100) NOT NULL,
    "accounts_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trasaction" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credited_account_id" TEXT NOT NULL,
    "debited_account_id" TEXT,

    CONSTRAINT "trasaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_id_key" ON "user"("accounts_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_accounts_id_fkey" FOREIGN KEY ("accounts_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trasaction" ADD CONSTRAINT "trasaction_credited_account_id_fkey" FOREIGN KEY ("credited_account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trasaction" ADD CONSTRAINT "trasaction_debited_account_id_fkey" FOREIGN KEY ("debited_account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
