import { cn } from "@/utils/clsx";

import ChatPanel from "@/components/chat/ChatPanel";
function ChatPage() {

  return (
    <div className={cn('p-2')}>
      <ChatPanel />
    </div>
  );
}

export default ChatPage;