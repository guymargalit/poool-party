"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavItem {
  href: string;
  title: string;
}

interface MainNavProps {
  items: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="flex flex-row gap-6 text-base font-semibold">
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.href}
            className={`transition-colors hover:text-foreground ${
              path === item.href ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
