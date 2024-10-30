import { signOut } from "@/auth";
import AppIcon from "./icons/app";
import NavLink from "./nav-link";

export default async function Navbar() {
  return (
    <header className="w-full sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="gap-3 text-lg font-medium flex flex-row items-center sm:gap-5 sm:text-sm lg:gap-6">
        <h1 className="flex items-center gap-2 text-lg font-semibold md:text-base select-none">
          <AppIcon />
          Invoicee
        </h1>
        <>
          <NavLink href={"/dashboard"} name="Dashboard" />
          <NavLink href={"/invoices"} name="Invoices" />
          <NavLink href={"/customers"} name="Customers" />
        </>
      </nav>
      <div className="w-full flex items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="flex items-center gap-6">
          <NavLink href={"/settings/account"} name="Account" />
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <button className="text-sm font-medium transition-colors text-muted-foreground">
              Logout
            </button>
          </form>
          {/* <Image
              src={user.avatar_url}
              className="rounded-full select-none"
              width={34}
              height={34}
              alt="User Image"
            /> */}
        </div>
      </div>
    </header>
  );
}
