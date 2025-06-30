import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/clsx';

const Timeline2 = ({ timeLineList = [], locale = 'tw' }) => {
  const { t } = useTranslation();
  const baseId = useId();

  return (
    <div className='pt-[10px] pb-[50px] lg:pt-[200px]'>
      <div className='relative flex flex-wrap after:absolute after:right-[-8px] after:translate-y-[2px] after:self-center'>
        {timeLineList.map((item, i) => {
          const isFirstTwo = i <= 1;

          return (
            <div
              key={`${baseId}-${i}`}
              className='relative mb-[100px] w-full lg:mb-0 lg:w-1/6'
            >
              <div className='relative'>
                {/* time point */}
                <time
                  className={cn(
                    'relative z-10 flex h-[100px] w-[100px] items-center justify-center rounded-full border text-center text-white',
                    isFirstTwo
                      ? 'border-[#313a98] bg-gradient-to-b from-[#171626] via-[#242777] to-[#171626]'
                      : 'border-custcolor-seventeen-blue bg-gradient-to-b from-[#041d1f] via-[#01444a] to-[#041d1f]'
                  )}
                >
                  {item.time}
                  <span
                    className={cn(
                      'absolute bottom-[60%] left-[120px] mx-auto text-[14px] whitespace-nowrap lg:top-[110%] lg:right-0 lg:left-0 lg:whitespace-normal',
                      isFirstTwo ? 'text-[#cbdbff]' : 'text-white'
                    )}
                    // react 的 dangerouslySetInnerHTML 就是替代 JS 的 innerHTML，可以將 HTML 塞入 DOM 元素中
                    dangerouslySetInnerHTML={{ __html: t(item.depictionTitle) }}
                  />
                </time>

                {/* line */}
                <span
                  className={cn(
                    "after:absolute after:bottom-[50%] after:left-0 after:h-[1px] after:w-full after:border-b-[3px] after:border-dashed after:content-['']",
                    isFirstTwo
                      ? 'after:border-b-[#313a98]'
                      : 'after:border-b-custcolor-seventeen-blue'
                  )}
                ></span>

                {/* content */}
                <div
                  className={cn(
                    'absolute top-[60%] bottom-0 left-[136px] ml-0 text-[14px] lg:top-[unset] lg:bottom-[110%] lg:left-[unset] lg:ml-[-5%] lg:w-[60%]',
                    locale !== 'us' ? 'indent-[-1em]' : 'indent-[-0.5em]',
                    isFirstTwo
                      ? 'text-[#313a98]'
                      : 'text-custcolor-seventeen-blue'
                  )}
                  dangerouslySetInnerHTML={{ __html: t(item.depictionOne) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline2;
