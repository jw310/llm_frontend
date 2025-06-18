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

export function SvgSpinner() {
  return (
    <div className='rounded-lg bg-white/10 p-6 backdrop-blur-sm'>
      <h2 className='mb-4 text-xl font-semibold text-white'>Svg</h2>
      <div className='flex justify-center'>
        <svg width='120' height='120' className='animate-spin'>
          <circle
            cx='60'
            cy='60'
            r='40'
            fill='none'
            stroke='#10b981'
            strokeWidth='4'
            strokeDasharray='20 10'
          />
        </svg>
      </div>
    </div>
  );
}
