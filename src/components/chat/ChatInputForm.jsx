import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';


import { cn } from '@/utils/clsx';

function ChatInput() {
  const { t } = useTranslation();

  const { handleSubmit, register, formState: { errors } } = useForm();

  let value = '';
  function handleKeyDown(event) {
    // console.log(event.target.value)
    const isCombo = event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    if (event.key !== 'Enter' || isCombo) {
      return;
    }

    if (event.key === 'Enter' && !isCombo && value === '') {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    // ('submit', value);
    value = '';
  }

  const onSubmit = async (data) => {
    // console.log(inputRef)
    console.log(data.messageInput);
  }

  const height = (value.match(/\n/g)?.length || 0) * 25 + 72;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
            // value={value}
          >
          </textarea>
          {errors?.messageInput?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.messageInput?.message}
            </p>
          )}
          <button
            className={cn('mt-1 w-[52px] cursor-pointer rounded bg-blue-600 px-2 py-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black')}
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