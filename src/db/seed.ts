import { v4 } from "uuid";
import { db } from ".";
import { customersTable, invoicesTable } from "./schema";
import { faker } from "@faker-js/faker";

const customers = [
  "35537c7f-ea0a-4df6-8980-db39088bc1a6",
  "53cc72ee-e591-4346-becf-061a482aa78d",
  "6e03eeaa-60be-4f63-b74e-c7a68d685197",
  "cdd6e52b-997d-42bd-9556-dd9c5e0be488",
  "47e2dbcb-e302-4575-b6fd-b17751ec4914",
];

async function main() {
  await createCustomers();

  console.log("DONE");
}

async function createCustomers() {
  for (let index = 0; index < 100; index++) {
    console.log(`Inserting ${index} customer`);
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    await db.insert(customersTable).values({
      id: v4(),
      user_id: "a1da008b-6248-44e2-9950-c2eb62756a6c",
      first_name,
      last_name,
      company: faker.company.name(),
      billing_address: faker.location.streetAddress(true),
      email: faker.internet.email({
        firstName: first_name,
        lastName: last_name,
      }),
      mobile: faker.phone.number(),
      gst_number: faker.random.alphaNumeric(15).toUpperCase(),
    });
  }
}

async function createInvoices() {
  for (let index = 0; index < 50; index++) {
    console.log(`Inserting ${index} invoice`);
    await db.insert(invoicesTable).values({
      customer_id: customers[Math.round(Math.random() * customers.length)],
      id: v4(),
      amount: `${Math.round(Math.random() * 50000)}`,
      date: new Date(),
      items: JSON.stringify([]),
      notes: JSON.stringify([]),
      status: 0,
      created_by_id: "a1da008b-6248-44e2-9950-c2eb62756a6c",
      discount_percentage: `${Math.round(Math.random() * 20)}`,
      quote_number: `${Math.round(Math.random() * 100)}`,
      tax_percentage: `${Math.round(Math.random() * 20)}`,
    });
  }
}

(async () => {
  await main();
})();
