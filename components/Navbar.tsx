import LinksDropdown from "./LinksDropdown";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-background/80 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <LinksDropdown />
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
        </div>

        <div className="flex items-center gap-x-3">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
