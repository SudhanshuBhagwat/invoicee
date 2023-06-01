"use server";

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Entity, deleteEntity as deleteDatabaseEntity, updateEntityCount } from "@/services/database";
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
