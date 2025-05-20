import AssistantMessage from './AssistantMessage';
import UserMessage from './UserMessage';
import PendingMessage from './PendingMessage';

import { cn } from '@/utils/clsx';

function ChatList({ messages }) {
  // const scrollIntoView = () => {
  //   //...
  // }

  return (
    <div className={cn("overflow-y-auto flex flex-col flex-1")}>
        {messages.map((message, index) => (
          <div key={index} className={cn("flex flex-col flex-1 gap-3 px-1.5 py-1")}>
            {message.role === 'user' || message.role === 'human' && (
              <UserMessage content={message.content} />
            )}
            {message.role === 'assistant' || message.role === 'ai' && (
              <AssistantMessage content={message.content} />
            )}
            {message.role === 'pending' && (
              <PendingMessage />
            )}
          </div>
          ))}
      {/* <div className={cn("pt-4")} scrollIntoView={messages} /> */}
    </div>
  );
}

export default ChatList;