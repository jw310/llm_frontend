import { cn } from '@/utils/clsx';

function PendingMessage() {
  return (
    <div className={cn("w-full max-w-sm rounded-md border p-4")}>
      <div className={cn("flex animate-pulse space-x-4")}
        role='status'
        aria-label='loading'>
        {/* <div className={cn("size-10 rounded-full bg-gray-200")}></div> */}
        <div className={cn("flex-1 space-y-4 py-1")}>
          <div className={cn("h-2 rounded bg-gray-200")}></div>
          <div className={cn("h-2 rounded bg-gray-200")}></div>
          <div className={cn("space-y-3")}>
            <div className={cn("grid grid-cols-3 gap-4")}>
              <div className={cn("col-span-2 h-2 rounded bg-gray-200")}></div>
              <div className={cn("col-span-1 h-2 rounded bg-gray-200")}></div>
            </div>
            {/* <div className={cn("h-2 rounded bg-gray-200")}></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMessage;