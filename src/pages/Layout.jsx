import { Outlet } from "react-router";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import { cn } from "@/utils/clsx.js";

function Layout() {
  return (
    <div className={cn("flex h-screen w-screen")}>
      <Navbar />
      <div className={cn("h-full w-full")}>
        <Header />
        <main className={cn("hide-scrollbar h-main w-full overflow-y-scroll bg-indigo-50")}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
