import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, {
  schema,
});

export const takeUniqueOrThrow = (message: string) => {
  return <T>(values: T[]): T => {
    if (values.length !== 1) throw new Error("Found non unique element");
    return values[0]!;
  };
};
