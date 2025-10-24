"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props extends React.ComponentProps<typeof Link> {
  children: ReactNode;
  activeClassName: string;
}

export default function NavLink({
  children,
  href,
  activeClassName,
  ...rest
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      {...rest}
      href={href}
      className={`${pathname === href ? activeClassName : ""} ${
        rest.className
      }`}
    >
      {children}
    </Link>
  );
}
