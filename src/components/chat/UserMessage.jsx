import { cn } from '@/utils/clsx';

function UserMessage({ content }) {
  return (
    <div
      className={cn(
        'my-0.25 max-w-4/5 self-end rounded-md border bg-slate-200 px-2.5 py-1 break-words text-black'
      )}
    >
      {content}
    </div>
  );
}

export default UserMessage;
