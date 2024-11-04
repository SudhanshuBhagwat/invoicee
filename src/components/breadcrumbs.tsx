"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import ROUTES from "@/lib/routeMap";

export default function Breakcrumbs() {
  const pathname = usePathname();

  function renderBreadcrumbs() {
    const path = ROUTES[pathname as keyof typeof ROUTES];

    if (Array.isArray(path)) {
      return path.map((currentPath, index) => (
        <>
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPath}</BreadcrumbPage>
          </BreadcrumbItem>
          {index < path.length - 1 && (
            <BreadcrumbSeparator className="hidden md:block" />
          )}
        </>
      ));
    }

    return (
      <BreadcrumbItem>
        <BreadcrumbPage>{path}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Invoicee</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {renderBreadcrumbs()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
