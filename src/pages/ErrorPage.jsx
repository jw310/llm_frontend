import ErrorImg from "@/assets/404-image.png";
// import Navbar from "@/components/Navbar.jsx";
// import Header from "@/components/Header.jsx";

function ErrorPage() {
  return (
    <div className="h-screen w-screen">
      {/* <Navbar /> */}
      <div className="h-full w-full">
        {/* <Header /> */}
        <main className="hide-scrollbar h-main w-full overflow-y-scroll bg-indigo-50">
          <div className="flex h-full w-full flex-col items-center justify-center gap-5">
            <img
              src={ErrorImg}
              alt="404-image"
              className="h-3/4 w-4/5 object-contain"
            />
            <span className="text-xs text-slate-500">
              Design By&nbsp;
              <a
                href="https://www.freepik.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
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
