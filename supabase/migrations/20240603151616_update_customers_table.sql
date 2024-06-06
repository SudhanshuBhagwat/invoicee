alter table
if exists public.customers add last_name text not null default '';

ALTER TABLE 
if exists public.customers rename column name to first_name;

alter table
if exists public.customers add billing_address text not null default '';