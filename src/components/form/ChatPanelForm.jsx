import { useState, useRef } from 'react';
// import { useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Alert from '../modal/Alert';
import Checkbox from '../checkbox/Checkbox';
import ChatList from '../chat/ChatList';
import ConversationSelect from '../chat/ConversationSelect';

import { cn } from '@/utils/clsx';
import trimString from '@/utils/trimString.js';

function ChatPanel() {
  const { t } = useTranslation();
  // const pathname = useLocation().pathname;
  // console.log('ChatPanel pathname:', pathname);

  const formRef = useRef(null);

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
  ]

  const conversations = [
    {
      id: '1',
    }
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({
    defaultValues: {
      streaming: false,
      messageInput: '',
    }
  });

  let watchedValues = watch();

	function handleNewChat() {
		// createConversation(documentId);
	}

  function handleKeyDown(event) {
    const isCombo = event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    if (event.key !== 'Enter' || isCombo) {
      return;
    }
    if (event.key === 'Enter' && !isCombo && event.target.value === '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    event.target.value = '';
  }

  const height = (watchedValues.messageInput?.match(/\n/g)?.length || 0) * 25 + 72;

  const onSubmit = async (data) => {
    data.messageInput = trimString(data.messageInput);
    console.log(data);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn('flex flex-col h-[calc(100vh-80px)] bg-slate-50 rounded-xl shadow')}
      >
        <div className={cn("rounded border-b px-3 py-1 flex flex-row items-center justify-between")}>
          <div className={cn("opacity-40")}>
            <Checkbox
              name="streaming"
              label="Streaming"
              control={control}
              rules={{ required: { false: true, message: 'Streaming' } }}
            />
          </div>
          <div className={cn("flex gap-2")}>
            <ConversationSelect conversations={conversations} />
            {/* <button className={cn("rounded text-sm border border-blue-500 px-2 py-0.5")}
              onClick={handleNewChat}
              >New Chat</button
            > */}
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
            <div className={cn('flex flex-col')}>
              {/* <label className='flex-shrink-0 text-base' htmlFor='messageInput'>
                  *text：
              </label> */}
              <textarea
                {...register('messageInput', {
                    required: { value: false, message: t('errorMessage.required') },
                })}
                  type='text'
                  id='messageInput'
                  className={cn("w-full mx-auto py-1.5 px-2.5 resize-none border rounded max-h-40")}
                  maxLength={50}
                  rows={5}
                  placeholder='Type your message here...'
                  onKeyDown={handleKeyDown}
                  style={{height: `${height}px`}}
                >
              </textarea>
              {errors?.messageInput?.type && (
                <p className='whitespace-nowrap text-red-500'>
                  {errors?.messageInput?.message}
                </p>
              )}
              {/* <button
                className={cn('w-fit mt-1 p-2 self-end rounded bg-blue-600 text-base text-white shadow-md',
                      'hover:bg-yellow-500 hover:text-black cursor-pointer'
                )}
                type='submit'
                >
                {t('common.submit')}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
};

export default ChatPanel;