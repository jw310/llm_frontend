import { Outlet } from "react-router";

// import Navbar from "@/components/Navbar.jsx";
// import Header from "@/components/Header.jsx";

function Layout() {
  return (
    <div className="flex h-screen w-screen">
      <Navbar />
      <div className="h-full w-full">
        <Header />
        <main className="hide-scrollbar h-main w-full overflow-y-scroll bg-indigo-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
