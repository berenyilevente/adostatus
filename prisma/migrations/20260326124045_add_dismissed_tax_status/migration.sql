-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ACCOUNTANT');

-- CreateEnum
CREATE TYPE "TaxStatus" AS ENUM ('NOT_PAID', 'PENDING', 'PAID', 'DISMISSED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "image" TEXT,
    "name" TEXT,
    "accountantId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_limits" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "maxBusinesses" INTEGER,
    "maxForms" INTEGER,
    "maxTeamMembers" INTEGER,
    "maxAppointmentsPerMonth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "tax_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_details" (
    "id" TEXT NOT NULL,
    "taxTypeId" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "bankName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tax_payment_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taxTypeId" TEXT NOT NULL,
    "paymentReference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tax_payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_items" (
    "id" TEXT NOT NULL,
    "taxRecordId" TEXT NOT NULL,
    "taxTypeId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" "TaxStatus" NOT NULL DEFAULT 'NOT_PAID',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "subscriptions_userId_idx" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_limits_subscriptionId_key" ON "subscription_limits"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "tax_types_name_key" ON "tax_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tax_types_code_key" ON "tax_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "bank_details_taxTypeId_key" ON "bank_details"("taxTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_tax_payment_details_userId_taxTypeId_key" ON "user_tax_payment_details"("userId", "taxTypeId");

-- CreateIndex
CREATE INDEX "tax_records_userId_idx" ON "tax_records"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tax_records_userId_year_month_key" ON "tax_records"("userId", "year", "month");

-- CreateIndex
CREATE INDEX "tax_items_taxRecordId_idx" ON "tax_items"("taxRecordId");

-- CreateIndex
CREATE INDEX "tax_items_status_idx" ON "tax_items"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tax_items_taxRecordId_taxTypeId_key" ON "tax_items"("taxRecordId", "taxTypeId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountantId_fkey" FOREIGN KEY ("accountantId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_limits" ADD CONSTRAINT "subscription_limits_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_details" ADD CONSTRAINT "bank_details_taxTypeId_fkey" FOREIGN KEY ("taxTypeId") REFERENCES "tax_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tax_payment_details" ADD CONSTRAINT "user_tax_payment_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tax_payment_details" ADD CONSTRAINT "user_tax_payment_details_taxTypeId_fkey" FOREIGN KEY ("taxTypeId") REFERENCES "tax_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_records" ADD CONSTRAINT "tax_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_items" ADD CONSTRAINT "tax_items_taxRecordId_fkey" FOREIGN KEY ("taxRecordId") REFERENCES "tax_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_items" ADD CONSTRAINT "tax_items_taxTypeId_fkey" FOREIGN KEY ("taxTypeId") REFERENCES "tax_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
