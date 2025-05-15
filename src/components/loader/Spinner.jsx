import { cn } from "@/utils/clsx.js";

export function Spinner() {
  return (
    <div className={cn("fixed inset-0 z-10 flex items-center justify-center bg-black opacity-60")}>
      <span className="relative h-4 w-4 rounded-full bg-white shadow-3xl animate-flash"></span>
    </div>
  );
}

export function SmallSpinner() {
  return <span className={cn("box-border inline-block h-[18px] w-[18px] animate-rotation",
          "border-[3px] border-[#808080] border-b-transparent rounded-full"
  )}></span>;
}

