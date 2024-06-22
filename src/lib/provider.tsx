"use client";

import { UserData } from "@/types/types";
import { ReactNode, createContext, useContext } from "react";

export const UserContext = createContext<UserContextType | null>(null);

type UserContextType = {
  avatar_url: string;
} & UserData;

export default function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserContextType;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
