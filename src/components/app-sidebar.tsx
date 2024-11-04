"use client";

import { Contact, File, Frame, PieChart, Settings, User } from "lucide-react";
import * as React from "react";

import { NavItems } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AppIcon from "./icons/app";
import { useUser } from "@/lib/provider";

const data = {
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },
    {
      name: "Invoices",
      url: "/invoices",
      icon: File,
    },
    {
      name: "Customers",
      url: "/customers",
      icon: Contact,
    },
  ],
  settings: [
    {
      name: "Account",
      url: "/settings/account",
      icon: User,
    },
    {
      name: "Preferences",
      url: "/settings/preferences",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  return (
    <Sidebar collapsible="none" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <AppIcon />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Invoicee</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItems groupName="Home" items={data.projects} />
      </SidebarContent>
      <NavItems groupName="User" items={data.settings} />
      <SidebarFooter>
        <NavUser
          user={{
            avatar: user?.avatar_url!,
            email: user?.email!,
            name: user?.name!,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
