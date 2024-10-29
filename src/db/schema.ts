import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  timestamp,
  numeric,
  integer,
  foreignKey,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  mobile: text("mobile"),
  company: text("company"),
  provider_id: text("provider_id"),
  gst_number: text("gst_number"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const invoicesTable = pgTable(
  "invoices",
  {
    id: uuid("id").primaryKey(),
    created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
    created_by_id: text("created_by_id").notNull(),
    date: timestamp("date", { mode: "string" }),
    amount: numeric("amount"),
    quote_number: numeric("quote_number"),
    items: text("items"),
    notes: text("notes"),
    status: integer("status").default(0),
    customer_id: uuid("customer_id"),
    tax_percentage: numeric("tax_percentage"),
    discount_percentage: numeric("discount_percentage"),
  },
  (table) => {
    return {
      customerReference: foreignKey({
        columns: [table.customer_id],
        foreignColumns: [customersTable.id],
        name: "fk_customer_id",
      }),
      userReference: foreignKey({
        columns: [table.created_by_id],
        foreignColumns: [users.id],
        name: "invoices_created_by_id_fkey",
      }),
    };
  }
);

export const customersTable = pgTable("customers", {
  id: uuid("id").primaryKey(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email"),
  mobile: text("mobile"),
  company: text("company"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  user_id: text("user_id").notNull(),
  billing_address: text("billing_address"),
  gst_number: text("gst_number"),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertCustomer = typeof customersTable.$inferInsert;
export type SelectCustomer = typeof customersTable.$inferSelect;

export type InsertInvoice = typeof invoicesTable.$inferInsert;
export type SelectInvoice = typeof invoicesTable.$inferSelect;

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  invoicesTable: many(invoicesTable),
  customersTable: many(customersTable),
}));

export const invoices = relations(invoicesTable, ({ one }) => ({
  customers: one(customersTable, {
    fields: [invoicesTable.customer_id],
    references: [customersTable.id],
  }),
}));

export const customersTableRelations = relations(
  customersTable,
  ({ many, one }) => ({
    invoicesTable: many(invoicesTable),
    users: one(users, {
      fields: [customersTable.user_id],
      references: [users.id],
    }),
  })
);
