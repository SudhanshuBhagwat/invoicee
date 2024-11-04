import { v4 } from "uuid";
import { db } from ".";
import { customersTable, invoicesTable } from "./schema";
import { faker } from "@faker-js/faker";

let invoiceNumber = 1;
const userId = "0ec67f4e-b283-4f7c-90f6-c9bfde06884b";

async function main() {
  await createCustomers();

  console.log("DONE");
  process.exit(0);
}

async function createCustomers() {
  for (let index = 0; index < 50; index++) {
    console.log(`Inserting ${index} customer`);
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const createdCustomer = await db
      .insert(customersTable)
      .values({
        id: v4(),
        user_id: userId,
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
      })
      .returning({
        id: customersTable.id,
      });

    console.log({ createdCustomer });
    await createInvoices(createdCustomer[0].id, Math.random() * 20);
  }
}

async function createInvoices(customerId: string, count: number) {
  for (let index = 0; index < count; index++) {
    console.log(`Inserting ${index} invoice`);
    await db.insert(invoicesTable).values({
      customer_id: customerId,
      id: v4(),
      amount: `${Math.round(Math.random() * 50000)}`,
      date: faker.date
        .between({ from: "2024-09-01", to: Date.now() })
        .toISOString(),
      items: JSON.stringify([]),
      notes: JSON.stringify([]),
      status: 0,
      created_by_id: userId,
      discount_percentage: `${Math.round(Math.random() * 50)}`,
      quote_number: `${invoiceNumber}`,
      tax_percentage: `10`,
    });
    invoiceNumber++;
  }
}

(async () => {
  await main();
})();
