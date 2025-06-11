import { cn } from '@/utils/clsx';

import ChatPanelForm from '@/components/form/ChatPanelForm';
function ChatPage() {
  return (
    <div className={cn('px-3 py-1')}>
      <ChatPanelForm />
    </div>
  );
}

export default ChatPage;
