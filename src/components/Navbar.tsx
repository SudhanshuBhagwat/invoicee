"use client";

import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/utils/supabase/client";

export default function Navbar({ user }: { user: User }) {
  const navigation = useRouter();

  async function handleSignOut() {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.replace("/signin");
    }
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800 border-b">
      <div className="flex items-center justify-between h-full px-4 text-purple-600 dark:text-purple-300">
        <h1 className="text-black font-extrabold text-3xl">Invoicee</h1>
        {user ? (
          <ul className="flex items-center flex-shrink-0 space-x-6">
            <li className="h-[34px]">
              {user && (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="focus:outline-none focus-visible:rounded-full focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-75">
                    <Image
                      src={user?.user_metadata.avatar_url}
                      className="rounded-full"
                      width={34}
                      height={34}
                      alt="User Image"
                    />
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item disabled>
                          <span
                            className={`group flex flex-col w-full rounded-md px-2 py-2 text-sm text-gray-900`}
                          >
                            <h4 className="font-medium">
                              {user.user_metadata.name}
                            </h4>
                            <p className="text-xs">
                              {user.user_metadata.email}
                            </p>
                          </span>
                        </Menu.Item>
                        <Separator />
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={`${
                                active
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/settings"
                              className={`${
                                active
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Separator />
                        <Menu.Item>
                          {({ active }) => (
                            <form action={handleSignOut}>
                              <button
                                className={`${
                                  active
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Sign Out
                              </button>
                            </form>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </li>
          </ul>
        ) : (
          <Link href={"/signin"} className="text-blue-400 underline">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
