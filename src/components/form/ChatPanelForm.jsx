import { useState, useRef } from 'react';
// import { useLocation } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Alert from '../modal/Alert';
import Checkbox from '../checkbox/Checkbox';
import ChatList from '../chat/ChatList';
import ConversationSelect from '../chat/ConversationSelect';
import Textarea from '../input/Textarea';

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
      content: 'Hello, how are you?',
    },
    {
      role: 'assistant',
      content: 'I am fine, thank you for asking.',
    },
  ];

  const conversations = [
    {
      id: '1',
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      streaming: false,
      messageInput: '',
    },
  });

  let watchedValues = watch();

  function handleNewChat() {
    // createConversation(documentId);
  }

  function handleKeyDown(event) {
    const isCombo =
      event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
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

  const height =
    (watchedValues.messageInput?.match(/\n/g)?.length || 0) * 25 + 72;

  const onSubmit = async (data) => {
    data.messageInput = trimString(data.messageInput).split('\n');
    console.log(data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(
          'flex h-[calc(100vh-80px)] flex-col rounded-xl bg-slate-50 shadow'
        )}
      >
        <div
          className={cn(
            'flex flex-row items-center justify-between rounded border-b px-3 py-1'
          )}
        >
          <div className={cn('opacity-40')}>
            <Checkbox
              name='streaming'
              label='Streaming'
              control={control}
              rules={{ required: { false: true, message: 'Streaming' } }}
            />
          </div>
          <div className={cn('flex gap-2')}>
            <ConversationSelect conversations={conversations} />
            {/* <button className={cn("rounded text-sm border border-blue-500 px-2 py-0.5")}
              onClick={handleNewChat}
              >New Chat</button
            > */}
          </div>
        </div>
        <div className={cn('flex flex-1 flex-col overflow-y-scroll px-3 py-2')}>
          <ChatList messages={messages || []} />
          <div className={cn('relative')}>
            <div className={cn('p-4')}>
              {showAlert.isShow && (
                <Alert type={showAlert.type} message={showAlert.message} />
              )}
            </div>
            <div className={cn('flex flex-col')}>
              {/* <label className='flex-shrink-0 text-base' htmlFor='messageInput'>
                  *text：
              </label> */}
              <textarea
                {...register('messageInput', {
                  required: {
                    value: false,
                    message: t('errorMessage.required'),
                  },
                })}
                type='text'
                id='messageInput'
                className={cn(
                  'mx-auto max-h-40 w-full resize-none rounded border px-2.5 py-1.5'
                )}
                maxLength={50}
                rows={5}
                placeholder='Type your message here...'
                onKeyDown={handleKeyDown}
                style={{ height: `${height}px` }}
              ></textarea>
              {/* <Controller
                control={control}
                name='textarea'
                rules={{
                  required: {
                    value: true,
                    message: 'Please input your message',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    onChange={onChange}
                    value={value}
                    // customStyle={cn(
                    //   'focus:none h-11 w-full rounded border-2 bg-gray-700 indent-3 text-white focus:outline-none',
                    //   `${errors?.role ? 'border-red-500' : 'border-grey-500'}`
                    // )}
                    // placeholder={t('createUser.rolePlaceholder')}
                  />
                )}
              /> */}
              {errors?.textarea?.type && (
                <p className='whitespace-nowrap text-red-500'>
                  {errors?.textarea?.message}
                </p>
              )}
              {/* <button
                className={cn(
                  'mt-1 w-fit self-end rounded bg-blue-600 p-2 text-base text-white shadow-md',
                  'cursor-pointer hover:bg-yellow-500 hover:text-black'
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
  );
}

export default ChatPanel;
