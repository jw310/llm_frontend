import { useState } from 'react';

import { cn } from '@/utils/clsx';

const TabGroup = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className={cn('flex w-full flex-col items-center justify-center px-5')}
    >
      <div
        className={cn(
          'flex w-[380px] flex-col items-center justify-around rounded-t-[32px]',
          'lg:h-[218px] lg:w-full lg:bg-gradient-to-b lg:from-gray-400 lg:from-[0%] lg:to-gray-500 lg:to-[99%]'
        )}
      >
        <h1
          className={cn(
            'text-grey-100 text-center text-[36px] font-bold lg:text-left lg:text-[46px]'
          )}
        >
          {'Tab'}
        </h1>
        <div
          className={cn(
            'mt-3 flex flex-wrap justify-center gap-3 lg:mt-0 lg:gap-[10px]'
          )}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                'w-[150px] rounded-3xl bg-gradient-to-l from-[#4C5E77] from-[0%] via-[#7B9CC7] via-[51.5%] to-[#596C84] p-4 font-bold lg:w-[230px] lg:p-6 lg:text-2xl',
                activeTab === index ? 'border-4 border-[#fff]' : ''
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className={cn('p-4')}> {tabs[activeTab].content}</div>
    </div>
  );
};

export default TabGroup;
