import { cn } from "@/utils/clsx.js";

export function Spinner() {
  return (
    <div className={cn("fixed inset-0 z-10 flex items-center justify-center bg-black opacity-60")}>
      <span className={cn("loader")}></span>
    </div>
  );
}

export function SmallSpinner() {
  return <span className={cn("small-loader")}></span>;
}
