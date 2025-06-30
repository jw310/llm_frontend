import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/clsx';

const Timeline2 = ({ timeLineList = [], locale = 'tw' }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('mt-[100px] mb-15 ml-6')}>
      <div
        className={cn(
          'relative flex flex-wrap after:absolute after:right-[-8px] after:translate-y-[2px] after:self-center'
        )}
      >
        {timeLineList.map((item, i) => {
          return (
            <div
              key={i}
              className={cn('relative mb-[100px] w-full lg:mb-0 lg:w-1/6')}
            >
              <div className={cn('relative')}>
                {/* time point */}
                <time
                  className={cn(
                    'relative z-10 flex h-[100px] w-[100px] items-center justify-center rounded-full border text-center text-white',
                    item.isMark
                      ? 'border-blue-300 bg-blue-300'
                      : 'border-gray-300 bg-gray-300'
                  )}
                >
                  {item.time}
                  <span
                    className={cn(
                      'absolute bottom-[60%] left-[120px] mx-auto text-[14px] whitespace-nowrap lg:top-[110%] lg:right-0 lg:left-0 lg:whitespace-normal',
                      item.isMark ? 'text-blue-300' : 'text-gray-300'
                    )}
                    // react 的 dangerouslySetInnerHTML 就是替代 JS 的 innerHTML，可以將 HTML 塞入 DOM 元素中
                    dangerouslySetInnerHTML={{ __html: t(item.depictionTitle) }}
                  />
                </time>

                {/* line */}
                <span
                  className={cn(
                    "after:absolute after:bottom-[50%] after:left-0 after:h-[1px] after:w-full after:border-b-2 after:border-dashed after:content-['']",
                    item.isMark
                      ? 'after:border-b-blue-300'
                      : 'after:border-b-gray-300'
                  )}
                ></span>

                {/* content */}
                <div
                  className={cn(
                    'absolute top-[60%] bottom-0 left-[136px] ml-0 text-[14px] lg:top-[unset] lg:bottom-[110%] lg:left-[unset] lg:ml-[-5%] lg:w-[60%]',
                    locale !== 'us' ? 'indent-[-1em]' : 'indent-[-0.5em]',
                    item.isMark ? 'text-blue-300' : 'text-gray-300'
                  )}
                  dangerouslySetInnerHTML={{ __html: t(item.depiction) }}
                />
              </div>
            </div>
          );
        })}
        <div className={cn('absolute top-[37%] right-[-140px] w-[30%]')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m8.25 4.5 7.5 7.5-7.5 7.5'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Timeline2;
