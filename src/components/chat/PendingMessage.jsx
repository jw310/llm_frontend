import { cn } from '@/utils/clsx';

function PendingMessage() {
  return (
    <div className={cn('min-h-15 border w-32 h-16 flex justify-center items-center rounded-md py-1 px-2.5 my-0.25 break-all self-start bg-gray-400 text-white')}>
      <div className={cn('animate-spin inline-block w-8 h-8 text-white-600',
        'border-[3px] border-current border-t-transparent rounded-full'
      )}
        role='status'
        aria-label='loading'
      >
      </div>
    </div>
  );
}

export default PendingMessage;