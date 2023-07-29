"use server";

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Entity, deleteEntity as deleteDatabaseEntity, updateEntityCount, updateUserDetails } from "@/services/database";
import { revalidatePath } from "next/cache";

export async function deleteEntity(entity: Entity, id: string, count: number, userId: string) {
  try {
    const supabase = createServerActionClient({ cookies });
    await Promise.allSettled([
      await deleteDatabaseEntity(supabase, entity, id),
      await updateEntityCount(
        supabase,
        entity,
        Number(count) - 1,
        userId
      ),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
  } catch (error) {
    throw new Error(`Error deleting ${entity}`);
  }

  revalidatePath("/");
}

export async function updateUserDetailsAction(formData: FormData) {
  const client = createServerActionClient({ cookies });
  try {
    await Promise.allSettled([
      await updateUserDetails(
        client,
        {
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          mobile: formData.get("mobile"),
        },
        (
          await client.auth.getUser()
        ).data.user?.id!
      ),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
  } catch (error) {
    throw new Error(`Error saving details`);
  }
}
