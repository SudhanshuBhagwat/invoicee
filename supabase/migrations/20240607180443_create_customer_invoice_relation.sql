alter table invoices
drop constraint if exists fk_customer_id;

ALTER TABLE invoices
ADD COLUMN IF NOT EXISTS customer_id uuid;

ALTER TABLE invoices ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers (id);

ALTER TABLE invoices
DROP COLUMN IF EXISTS client_name,
DROP COLUMN IF EXISTS client_company,
DROP COLUMN IF EXISTS client_mobile,
DROP COLUMN IF EXISTS client_email;