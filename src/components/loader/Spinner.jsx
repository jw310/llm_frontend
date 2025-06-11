import { cn } from '@/utils/clsx.js';

export function Spinner() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-10 flex items-center justify-center bg-black opacity-60'
      )}
    >
      <span className='shadow-3xl animate-flash relative h-4 w-4 rounded-full bg-white'></span>
    </div>
  );
}

export function SmallSpinner() {
  return (
    <span
      className={cn(
        'animate-rotation box-border inline-block h-[18px] w-[18px]',
        'rounded-full border-[3px] border-[#808080] border-b-transparent'
      )}
    ></span>
  );
}
