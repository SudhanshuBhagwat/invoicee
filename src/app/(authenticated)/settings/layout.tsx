import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Manage personal details for you Invoicee profile for a seamless experience.",
};

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Preferences",
    href: "/settings/preferences",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
