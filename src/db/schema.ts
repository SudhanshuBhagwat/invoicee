import {
  pgTable,
  text,
  uuid,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("User", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile"),
  company: text("company"),
  provider_id: text("provider_id").notNull(),
  gst_number: text("gst_number"),
});

export const invoicesTable = pgTable("invoices", {
  id: uuid("id").primaryKey(),
  created_at: timestamp("created_id").defaultNow(),
  created_by_id: text("created_by_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  date: timestamp("date"),
  amount: numeric("amount"),
  quote_number: numeric("quote_number"),
  items: text("items"),
  notes: text("notes"),
  status: integer("status"),
  customer_id: uuid("customer_id").references(() => customersTable.id, {
    onDelete: "cascade",
  }),
  tax_percentage: numeric("tax_percentage"),
  discount_percentage: numeric("discount_percentage"),
});

export const customersTable = pgTable("customers", {
  id: uuid("id").primaryKey(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email"),
  mobile: text("mobile"),
  company: text("company"),
  created_at: timestamp("created_id").defaultNow(),
  user_id: text("user_id").notNull(),
  billing_address: text("billing_address"),
  gst_number: text("gst_number"),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCustomer = typeof customersTable.$inferInsert;
export type SelectCustomer = typeof customersTable.$inferSelect;

export type InsertInvoice = typeof invoicesTable.$inferInsert;
export type SelectInvoice = typeof invoicesTable.$inferSelect;
