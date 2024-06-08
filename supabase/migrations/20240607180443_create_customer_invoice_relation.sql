ALTER
TABLE
 invoices
ADD
 
COLUMN
 customer_id 
uuid
,
ADD
 
CONSTRAINT
 fk_customer_id 
FOREIGN
 KEY (customer_id) 
REFERENCES
 customers (id);


ALTER
 
TABLE
 invoices
DROP
 
COLUMN
 client_name,
DROP
 
COLUMN
 client_company,
DROP
 
COLUMN
 client_mobile,
DROP
 
COLUMN
 client_email;
