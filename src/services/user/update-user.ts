"use server";

import { createClient } from "@/utils/supabase/server";

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
  gst_number: string;
}) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("User")
      .update({ email, name, mobile, company, gst_number })
      .eq("id", user_id);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};
