"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import links from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function LinksDropdown() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl lg:hidden">
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Toggle links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-xl p-2 lg:hidden"
        align="start"
        sideOffset={12}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <DropdownMenuItem
              asChild
              key={link.href}
              className="rounded-lg p-0 my-2 cursor-pointer"
            >
              <Link
                href={link.href}
                className={cn(
                  "flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
