"use client";

import Logo from "@/assets/logo.svg";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground sticky top-0">
      <div className="border-b px-8 py-6">
        <Link href="/" className="block">
          <Image
            src={Logo}
            alt="logo"
            className="mx-auto h-10 w-auto"
            priority
          />
        </Link>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? "default" : "ghost"}
              className={cn(
                "h-11 w-full justify-start gap-x-3 rounded-xl px-4 text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Link href={link.href}>
                <Icon className="h-4 w-4" />
                <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
