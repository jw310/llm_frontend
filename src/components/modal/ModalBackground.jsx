import { cn } from '@/utils/clsx.js';
function ModalBackground() {
  return (
    <div className={cn('fixed inset-0 h-full w-full bg-grey-800 opacity-50')}></div>
  );
}

export default ModalBackground;
