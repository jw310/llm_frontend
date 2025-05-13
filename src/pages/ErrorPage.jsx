import ErrorImg from "@/assets/404-image.png";

// import Navbar from "@/components/Navbar.jsx";
// import Header from "@/components/Header.jsx";

import { cn } from "@/utils/clsx.js";

function ErrorPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className={cn("h-full w-full")}>
        {/* <Header /> */}
        <main className={cn("hide-scrollbar h-main w-full overflow-y-scroll bg-indigo-50")}>
          <div className={cn("flex h-full w-full flex-col items-center justify-center gap-5")}>
            <img
              src={ErrorImg}
              alt="404-image"
              className={cn("h-3/4 w-4/5 object-contain")}
            />
            <span className={cn("text-xs text-slate-500")}>
              Design By&nbsp;
              <a
                href="https://www.freepik.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("underline")}
              >
                FreePik
              </a>
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ErrorPage;
