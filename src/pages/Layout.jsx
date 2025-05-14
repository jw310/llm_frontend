import { Outlet } from "react-router";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import { cn } from "@/utils/clsx.js";

function Layout() {
  return (
    <div className={cn("flex h-screen")}>
      <Navbar />
      <div className={cn("h-screen w-full overflow-auto")}>
        <Header />
        <main className={cn("bg-indigo-50")}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
