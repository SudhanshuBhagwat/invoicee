import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import NavLink from "./ui/nav-link";

const LINKS = [
  {
    href: "/",
    name: "Dashboard",
  },
];

function Sidebar() {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-gray-50 shadow-md dark:bg-gray-800 lg:block border-r">
      <div className="py-4 h-full text-gray-500 dark:text-gray-400 flex flex-col justify-between">
        <div>
          <a
            className="ml-6 text-xl font-bold text-gray-800 dark:text-gray-200"
            href="/"
          >
            Invoicee
          </a>
          <ul className="mt-6 space-y-2">
            {LINKS.map((link) => (
              <li className="relative px-2">
                <NavLink
                  href={link.href}
                  className="py-2 rounded-md inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:bg-gray-700 hover:text-gray-50 dark:hover:text-gray-200"
                  activeClassName="bg-gray-800 text-white"
                >
                  <span className="ml-4">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <ul className="space-y-2">
            <li className="relative px-2">
              <NavLink
                href={"/settings"}
                className="py-2 rounded-md inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:bg-gray-700 hover:text-gray-50 dark:hover:text-gray-200"
                activeClassName="bg-gray-800 text-white"
              >
                <span className="ml-4">Settings</span>
              </NavLink>
            </li>
            <li className="w-full flex justify-between items-center px-2 pt-4">
              <div className="flex items-center space-x-2 pointer-events-none">
                <div className="inline-block w-8 h-8 rounded-full bg-red-600"></div>
                <div>
                  <p className="text-sm font-bold -mb-2">Sudhanshu Bhagwat</p>
                  <span className="text-[11px]">
                    sudhanshubhagwat3@gmail.com
                  </span>
                </div>
              </div>
              <div>
                <button>
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
