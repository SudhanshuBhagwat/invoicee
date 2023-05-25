import { getUser } from "@/services/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const userData = await getUser(supabase, session?.user.id!);

  async function handleSubmit(formData: FormData) {
    "use server";
  }

  return (
    <div className="px-6 mt-2">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      <span className="text-xs text-gray-500">
        Update your information that is prefilled on the Quotations/Invoices
        page.
      </span>
      <div className="w-full h-[1px] bg-gray-200 my-4" />
      <div className="w-full flex">
        <h3 className="w-64">Details</h3>
        <form
          id="details"
          action={handleSubmit}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor={"name"} className="text-sm">
              Name:
            </label>
            <input
              required
              id={"name"}
              name={"name"}
              placeholder="John Doe"
              value={userData?.name}
              className="border rounded-md px-4 py-2 text-md placeholder:text-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={"company"} className="text-sm">
              Company:
            </label>
            <input
              required
              id={"company"}
              name={"company"}
              value={userData?.company}
              placeholder="Demon Slayer Corp"
              className="border rounded-md px-4 py-2 text-md placeholder:text-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={"mobile"} className="text-sm">
              Mobile:
            </label>
            <input
              required
              id={"mobile"}
              name={"mobile"}
              value={userData?.mobile}
              placeholder="+91 1234567890"
              className="border rounded-md px-4 py-2 text-md placeholder:text-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={"email"} className="text-sm">
              Email:
            </label>
            <input
              required
              id={"email"}
              name={"email"}
              value={userData?.email}
              placeholder="john.doe@example.com"
              className="border rounded-md px-4 py-2 text-md placeholder:text-md"
            />
          </div>
        </form>
      </div>
      <div className="w-full h-[1px] bg-gray-200 my-4" />
      <div className="w-full flex justify-end items-center">
        <button
          type="submit"
          form="details"
          className="px-3 py-1 text-md bg-emerald-600 text-white font-semibold rounded-md flex items-center justify-center text-center"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
