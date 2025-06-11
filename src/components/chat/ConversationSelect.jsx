import { useState } from 'react';

import { cn } from '@/utils/clsx';

function ConversationSelect({ conversations }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async (conversation) => {
    setIsOpen(false);

    console.log(conversation);
  };

  return (
    <>
      <div className={cn('relative inline-block text-left')}>
        <div>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            type='button'
            className={cn(
              'inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            )}
            id='options-menu'
            aria-haspopup='true'
            aria-expanded='true'
          >
            History
            <svg
              className={cn('-mr-1 ml-2 h-5 w-5')}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className={cn(
              'ring-opacity-5 absolute right-0 mt-2 max-h-[250px] w-56 max-w-[250px] origin-top-right overflow-y-scroll rounded-md bg-white shadow-lg ring-1 ring-black'
            )}
          >
            <div
              className={cn('py-1')}
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {conversations.map((conversation, index) => (
                <div
                  key={index}
                  classNameName={cn('py-1')}
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='options-menu'
                >
                  <div
                    className={cn(
                      'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                    onClick={() => handleClick(conversation)}
                    onKeypress={() => {}}
                  >
                    {conversation.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ConversationSelect;
