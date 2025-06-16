import { useRef } from 'react';

import { cn } from '@/utils/clsx';
function Textarea({ value = [], onChange }) {
  const textRef = useRef(value.join('\n'));

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
    value = event.target.value;
    console.log(value);
    onChange(value.split('\n'));
    event.target.value = '';
  }

  // const height =
  //   (watchedValues.messageInput?.match(/\n/g)?.length || 0) * 25 + 72;

  return (
    <div className='flex flex-col'>
      {/* <label htmlFor='messageInput' className='flex-shrink-0 text-base'>
        *text：
      </label> */}
      <textarea
        type='text'
        id='messageInput'
        className={cn(
          'mx-auto max-h-40 w-full resize-none rounded border px-2.5 py-1.5'
        )}
        maxLength={50}
        rows={5}
        placeholder='Type your message here...'
        onKeyDown={handleKeyDown}
        onChange={handleKeyDown}
        // style={{ height: `${height}px` }}
      />
    </div>
  );
}

export default Textarea;
