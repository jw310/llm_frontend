import { cn } from '@/utils/clsx';

function UserMessage({ content }) {
  return (
    <div className={cn('max-w-4/5 border rounded-md py-1 px-2.5 my-0.25 break-words self-end bg-slate-200')}>
      {content}
    </div>
  );
}

export default UserMessage;