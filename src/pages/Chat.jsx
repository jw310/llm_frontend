import { cn } from "@/utils/clsx";

import ChatPanelForm from "@/components/form/ChatPanelForm";
function ChatPage() {

  return (
    <div className={cn('p-2')}>
      <ChatPanelForm />
    </div>
  );
}

export default ChatPage;