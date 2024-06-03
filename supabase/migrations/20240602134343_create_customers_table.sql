create table customers (
    id uuid primary key default uuid_generate_v4(),
    name text,
    email text,
    mobile text,
    company text,
    created_at timestamptz default now()
);