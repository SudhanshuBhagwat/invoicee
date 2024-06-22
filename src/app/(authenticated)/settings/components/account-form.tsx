"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/provider";
import { updateUser } from "@/services/user/update-user";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  company: z
    .string()
    .min(6, {
      message: "Company must be at least 2 characters.",
    })
    .max(30, {
      message: "Company must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  mobile: z
    .string()
    .min(10, {
      message: "Mobile must be at least 10 characters.",
    })
    .max(10, {
      message: "Mobile must not be longer than 10 characters.",
    }),
  gst_number: z
    .string()
    .min(15, {
      message: "GST Number must be at least 15 characters.",
    })
    .max(15, {
      message: "GST Number must not be longer than 15 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const user = useUser();
  const defaultValues: Partial<AccountFormValues> = {
    name: user?.name,
    company: user?.company,
    email: user?.email,
    mobile: user?.mobile,
    gst_number: user?.gst_number,
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(data: AccountFormValues) {
    try {
      const response = await updateUser({
        ...data,
        user_id: user?.id!,
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1234567890" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gst_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="1234567890" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
