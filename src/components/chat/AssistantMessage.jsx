import { cn } from '@/utils/clsx';

function AssistantMessage({ content }) {
  return (
    <div className={cn('flex flex-row items-center justify-between')}>
      <div
        className={cn(
          'my-0.25 max-w-4/5 self-start bg-blue-500 px-2.5 py-1.5 text-gray-100',
          'rounded-md border break-words'
        )}
      >
        {content}
      </div>
    </div>
  );
}

export default AssistantMessage;
