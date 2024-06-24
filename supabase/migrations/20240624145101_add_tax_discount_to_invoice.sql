ALTER TABLE invoices
ADD COLUMN tax_percentage numeric DEFAULT 0;

ALTER TABLE invoices
ADD COLUMN discount_percentage numeric DEFAULT 0;