/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `formData` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `appointments` table. All the data in the column will be lost.
  - The `status` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isActive` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `redirectUrl` on the `forms` table. All the data in the column will be lost.
  - The `status` column on the `forms` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `formId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the `appointment_reminders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form_fields` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[businessId,dayOfWeek]` on the table `break_times` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceId]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - Made the column `serviceId` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamMemberId` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `serviceId` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamMemberId` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('DRAFT', 'LIVE', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "appointment_reminders" DROP CONSTRAINT "appointment_reminders_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_teamMemberId_fkey";

-- DropForeignKey
ALTER TABLE "form_fields" DROP CONSTRAINT "form_fields_formId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_formId_fkey";

-- DropIndex
DROP INDEX "appointments_status_idx";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
DROP COLUMN "formData",
DROP COLUMN "notes",
ADD COLUMN     "backgroundColor" TEXT,
ADD COLUMN     "content" JSONB,
ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "formId" TEXT,
ALTER COLUMN "serviceId" SET NOT NULL,
ALTER COLUMN "teamMemberId" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "isActive",
DROP COLUMN "redirectUrl",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "services" DROP COLUMN "formId",
ADD COLUMN     "teamMemberId" TEXT NOT NULL;

-- DropTable
DROP TABLE "appointment_reminders";

-- DropTable
DROP TABLE "form_fields";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "customers_businessId_idx" ON "customers"("businessId");

-- CreateIndex
CREATE INDEX "customers_businessId_email_idx" ON "customers"("businessId", "email");

-- CreateIndex
CREATE INDEX "appointments_businessId_deleted_idx" ON "appointments"("businessId", "deleted");

-- CreateIndex
CREATE INDEX "appointments_start_end_deleted_idx" ON "appointments"("start", "end", "deleted");

-- CreateIndex
CREATE INDEX "break_times_businessId_dayOfWeek_idx" ON "break_times"("businessId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "break_times_businessId_dayOfWeek_key" ON "break_times"("businessId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "business_hours_businessId_dayOfWeek_idx" ON "business_hours"("businessId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "forms_serviceId_key" ON "forms"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "forms_url_key" ON "forms"("url");

-- CreateIndex
CREATE INDEX "forms_serviceId_idx" ON "forms"("serviceId");

-- CreateIndex
CREATE INDEX "services_teamMemberId_idx" ON "services"("teamMemberId");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "team_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "team_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
