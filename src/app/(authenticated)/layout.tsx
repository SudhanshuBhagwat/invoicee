import { auth } from "@/auth";
import UserContextProvider from "@/lib/provider";
import React from "react";
import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <>
      <UserContextProvider
        //@ts-ignore
        user={{
          ...session.user,
          avatar_url: session.user.image!,
        }}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-6">
                <Breadcrumbs />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <main className="px-2">{children}</main>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </UserContextProvider>
    </>
  );
}
