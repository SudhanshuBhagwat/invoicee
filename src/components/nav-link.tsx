"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        pathname !== href ? "text-muted-foreground" : ""
      }`}
    >
      {name}
    </Link>
  );
}
