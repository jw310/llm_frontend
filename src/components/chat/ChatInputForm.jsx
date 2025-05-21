import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/clsx';

function ChatInput() {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const { handleSubmit, register, formState: { errors } } = useForm();

  let inputValue = '';
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

  const onSubmit = async (data) => {
    console.log(data.messageInput);
  }

  const height = (inputValue.match(/\n/g)?.length || 0) * 25 + 72;

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
          <button
            className={cn('w-fit mt-1 p-2 self-end rounded bg-blue-600 text-base text-white shadow-md',
                  'hover:bg-yellow-500 hover:text-black cursor-pointer'
            )}
            type='submit'
            >
            {t('common.submit')}
          </button>
        </div>
      </form>
    </>
  )
}

export default ChatInput;