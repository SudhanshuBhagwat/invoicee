"use client";

import { updateUserDetailsAction } from "@/lib/actions";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function UserDetails({ data: userData } : { data: any }) {
  const [saving, setSaving] = useState<boolean>(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);

    await toast.promise(updateUserDetailsAction(formData), {
      error: e => e.message,
      loading: "Updating...",
      success: "Successfully updated details."
    }).then(() => setSaving(false));
  }

  return <div><h2 className="text-lg font-semibold">Personal Information</h2>
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
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor={"name"} className="text-sm">
              Name:
            </label>
            <input
              required
              id={"name"}
              name={"name"}
              placeholder="John Doe"
              defaultValue={userData?.name}
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
              defaultValue={userData?.company}
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
              defaultValue={userData?.mobile}
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
              defaultValue={userData?.email}
              placeholder="john.doe@example.com"
              className="border rounded-md px-4 py-2 text-md placeholder:text-md"
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-4" />
        <div className="w-full flex justify-end items-center">
          <button
            type="submit"
            form="details"
            className="px-3 py-1 text-md bg-emerald-600 text-white font-semibold rounded-md flex items-center justify-center text-center"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
}
