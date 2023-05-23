import NavLink from "./ui/nav-link";

function Sidebar() {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block border-r">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-xl font-bold text-gray-800 dark:text-gray-200"
          href="/"
        >
          Invoicee
        </a>
        <ul className="mt-6 space-y-2">
          <li className="relative px-2">
            <NavLink
              href={"/"}
              className="py-2 rounded-md inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:bg-gray-700 hover:text-gray-50 dark:hover:text-gray-200"
              activeClassName="bg-gray-800 text-white"
            >
              <span className="ml-4">Dashboard</span>
            </NavLink>
          </li>
          <li className="relative px-2">
            <NavLink
              href={"/quotations"}
              className="py-2 rounded-md inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:bg-gray-700 hover:text-gray-50 dark:hover:text-gray-200"
              activeClassName="bg-gray-800 text-white"
            >
              <span className="ml-4">Quotations</span>
            </NavLink>
          </li>
          <li className="relative px-2">
            <NavLink
              href={"/invoices"}
              className="py-2 rounded-md inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:bg-gray-700 hover:text-gray-50 dark:hover:text-gray-200"
              activeClassName="bg-gray-800 text-white"
            >
              <span className="ml-4">Invoices</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
