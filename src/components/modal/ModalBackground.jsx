import { cn } from '@/utils/clsx.js';
function ModalBackground() {
  return (
    <div
      className={cn('bg-grey-800 fixed inset-0 h-full w-full opacity-50')}
    ></div>
  );
}

export default ModalBackground;
