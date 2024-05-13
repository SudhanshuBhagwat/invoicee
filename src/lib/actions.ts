"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import {
  Entity,
  deleteEntity as deleteDatabaseEntity,
  updateEntityCount,
  updateUserDetails,
} from "@/services/database";
import { revalidatePath } from "next/cache";

export async function deleteEntity(
  entity: Entity,
  id: string,
  count: number,
  userId: string
) {
  try {
    const supabase = createServerActionClient({ cookies });
    await Promise.allSettled([
      await deleteDatabaseEntity(supabase, entity, id),
      await updateEntityCount(supabase, entity, Number(count) - 1, userId),
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

function parseItems(data: Record<string, string>) {
  const items = [];

  for (const key of Object.keys(data)) {
    if (key.startsWith("item")) {
      let result = key.match(
        /item\[([0-9]+)](category|amount|name|description)\[([0-9]+)]\[([a-z]+)]/
      );
      if (result) {
        const itemIndex = result[1];
        const type = result[2];
        const index = result[3];
        const value = result[4];
      } else {
        result = key.match(/item\[([0-9]+)]\[([a-z]+)]/);
        if (result) {
          items.push({});
          const index = Number(result[1]);
          const name = result[2];

          items[index] = {
            ...items[index],
            [name]: data[key],
          };
        }
      }
    }
  }

  return items.filter((item) => Object.keys(item).length > 0);
}

export async function handleSubmit(formData: FormData) {
  "use server";

  const data = Object.fromEntries(formData) as Record<string, string>;
  const items = parseItems(data);

  console.log(items);

  // event.preventDefault();
  // setIsLoading(true);
  // const quotationCount = Number(quotation.number.substring(2));
  try {
    const data = await Promise.allSettled([
      // quotation.id.length > 0
      //   ? await updateEntity(supabase, type, {
      //       ...quotation,
      //       amount: totalAmount,
      //     })
      //   : await createEntity(
      //       supabase,
      //       type,
      //       {
      //         ...quotation,
      //         amount: totalAmount,
      //       },
      //       user!.id
      //     ),
      // await createInvoice(quotation, session.data?.user.id!),
      // await updateEntityCount(supabase, type, quotationCount, user!.id),
      // new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
    // @ts-ignore
    // const id = data[0].value[0].id;

    // if (quotation.id.length === 0) {
    //   navigate.push(`/${type}/${id}`);
    // }
  } catch (e) {
    console.log({ e });
    // setIsLoading(false);
    // console.error("Something went wrong");
  }
  // setIsLoading(false);
  // formRef.current?.reset();
}
