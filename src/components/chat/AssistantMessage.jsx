import { cn } from '@/utils/clsx';

function AssistantMessage({ content }) {
  return (
    <div className={cn("flex flex-row items-center justify-between")}>
      <div className={cn("max-w-4/5 py-1.5 px-2.5 my-0.25 self-start bg-blue-500 text-gray-100",
          'border rounded-md break-words'
      )}>
        {content}
      </div>
    </div>
  );
}

export default AssistantMessage;