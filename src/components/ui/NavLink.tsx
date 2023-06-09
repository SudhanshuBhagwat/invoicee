"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react";

interface Props {
  href: string,
  children: ReactNode
}

export default function NavLink({ href, children }: Props) {
  const segment = useSelectedLayoutSegment();
  const active = href === `/${segment}`;

  return <Link href={href} className={active ? "underline" : ""}>{children}</Link>
}
