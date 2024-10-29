"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateUser = async ({
  email,
  name,
  mobile,
  company,
  user_id,
  gst_number,
}: {
  email: string;
  name: string;
  mobile: string;
  company: string;
  user_id: string;
  gst_number?: string | null;
}) => {
  try {
    const data = await db
      .update(users)
      .set({ email, name, mobile, company, gst_number })
      .where(eq(users.id, user_id));

    revalidatePath("/settings/account");
    return data;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};
