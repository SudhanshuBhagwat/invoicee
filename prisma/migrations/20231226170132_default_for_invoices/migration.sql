/*
  Warnings:

  - Made the column `client_name` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `client_mobile` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `client_company` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `client_email` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quote_number` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "client_name" SET NOT NULL,
ALTER COLUMN "client_mobile" SET NOT NULL,
ALTER COLUMN "client_company" SET NOT NULL,
ALTER COLUMN "client_email" SET NOT NULL,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "quote_number" SET NOT NULL,
ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "notes" SET DEFAULT '',
ALTER COLUMN "items" SET DEFAULT '[]';
