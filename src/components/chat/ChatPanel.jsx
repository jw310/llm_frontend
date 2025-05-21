import { useState } from 'react';

import { cn } from '@/utils/clsx';

import Alert from '../modal/Alert';
import ChatInputForm from './ChatInputForm';
import ChatList from './ChatList';
import ConversationSelect from './ConversationSelect';

function ChatPanel() {

  const [showAlert, setShowAlert] = useState({
    type: '',
    message: '',
    isShow: false,
  });

  const messages = [
    {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
        {
      role: 'user',
      content: 'Hello, how are you?'
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.'
    },
    
  ]

  const conversations = [
    {
      id: '1',
    }
  ]

  function handleSubmit(event) {
    console.log(event)
		// if (onSubmit) {
		// 	onSubmit(event.detail, useStreaming);
		// }
	}

	function handleNewChat() {
		// createConversation(documentId);
	}

  return (
    <>
      <div
        // style={{height: `calc(100vh - 80px)}}
        className={cn('flex flex-col h-full bg-slate-50 border rounded-xl shadow')}
      >
        <div className={cn("rounded-lg border-b px-3 py-2 flex flex-row items-center justify-between")}>
          {/* <div className={cn("opacity-40")}>
            <input id="chat-type" type="checkbox" checked={useStreaming} />
            <label htmlFor="chat-type" className={cn("italic")}>Streaming</label>
          </div> */}
          <div className={cn("flex gap-2")}>
            <ConversationSelect conversations={conversations} />
            <button className={cn("rounded text-sm border border-blue-500 px-2 py-0.5")}
              onClick={handleNewChat}
              >New Chat</button
            >
          </div>
        </div>
        <div className={cn("flex flex-col flex-1 px-3 py-2 overflow-y-scroll")}>
          <ChatList messages={messages || []} />
          <div className={cn("relative")}>
            <div className={cn("p-4")}>
              {
                showAlert.isShow && (
                  <Alert type={showAlert.type} message={showAlert.message} />
                )
              }
            </div>
            <ChatInputForm onClink={(event) => handleSubmit(event)} />
          </div>
        </div>
      </div>
    </>
  )
};

export default ChatPanel;