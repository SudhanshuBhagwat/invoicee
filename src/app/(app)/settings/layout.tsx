import NavLink from "@/components/ui/nav-link";

const LINKS = [
  {
    href: "details",
    name: "My Details",
  },
];

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen dark:bg-gray-900`}>
      <div className="flex flex-col flex-1 w-full">
        <div className="h-full overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <nav className="mt-6">
              <ul className="flex space-x-4">
                {LINKS.map((link) => (
                  <li>
                    <NavLink
                      href={`/settings/${link.href}`}
                      className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                      activeClassName="text-gray-700 bg-gray-100"
                    >
                      <span className="">{link.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
