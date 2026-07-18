import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar />

      <div className="min-w-0">
        <Navbar />
        <section className="p-4 sm:p-6 lg:p-8">{children}</section>
      </div>
    </main>
  );
}

export default Layout;
