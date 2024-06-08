"use server";

import { createClient } from "@/utils/supabase/server";

export const updateUser = async ({
  email,
  name,
  mobile,
  company,
  user_id,
}: {
  email: string;
  name: string;
  mobile: string;
  company: string;
  user_id: string;
}) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("User")
      .update({ email, name, mobile, company })
      .eq("id", user_id);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};
