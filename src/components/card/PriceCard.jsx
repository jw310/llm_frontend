import { useState } from 'react';

import { cn } from '@/utils/clsx';
import toThousands from '@/utils/toThousands';

export default function PriceCard({ plan }) {
  const [inputValue, setInputValue] = useState(1);

  const handlePayClick = (id) => {
    console.log(id);
  };

  return (
    <div
      className={cn(
        'relative flex h-fit w-full flex-col justify-between gap-4 rounded-md border-[3px] px-5 py-10',
        'lg:h-[400px] lg:max-w-[288px] lg:flex-1',
        plan.id === '24-month' ? 'border-yellow-500' : 'border-gray-700'
      )}
    >
      {plan.id === '24-month' && (
        <div
          className={cn(
            'absolute -top-[1px] -left-[1px] flex h-7 w-[140px] items-center justify-center rounded-br-md bg-yellow-500 text-sm font-medium text-gray-800'
          )}
        >
          BestPrice
        </div>
      )}

      <div className={cn('flex h-fit flex-col')}>
        <div className={cn('flex h-fit flex-col')}>
          <h1 className={cn('text-[28px] font-medium')}>{plan.title}</h1>
          <p
            className={cn(
              'mt-6 flex h-fit items-center text-base text-gray-500'
            )}
          >
            NT$
            <span className={cn('mx-2 text-[46px] font-bold text-gray-800')}>
              {toThousands(plan.NTDPrice)}
            </span>
            {'perMonth'}
          </p>
          <p className={cn('mt-6 text-base text-gray-500')}>
            ≒ USD {toThousands(plan.USDPrice)}
          </p>
        </div>
      </div>

      <div className={cn('flex flex-col gap-4')}>
        {plan.id === '1-month' && (
          <div className={cn('flex items-center gap-2')}>
            <div className={cn('text-sm text-gray-500')}>months</div>
            <div className={cn('flex h-11 w-full max-w-[180px]')}>
              <button
                className={cn(
                  'flex h-full flex-1 items-center rounded-l-md border border-gray-600 bg-gray-700 p-3'
                )}
                disabled={inputValue === 1}
                onClick={() => setInputValue((prev) => prev - 1)}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 10H16'
                    stroke={inputValue === 1 ? '#949EAE' : '#EFF2F5'}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <div
                className={cn(
                  'flex-2 border-y border-gray-600 bg-gray-900 align-middle text-gray-100'
                )}
              >
                <input
                  type='number'
                  disabled
                  className={cn(
                    'h-full w-full bg-transparent text-center text-gray-100'
                  )}
                  value={inputValue}
                />
              </div>
              <button
                className={cn(
                  'flex h-full flex-1 items-center rounded-r-md border border-gray-600 bg-gray-700 p-3'
                )}
                disabled={inputValue === 24}
                onClick={() => setInputValue((prev) => prev + 1)}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 4V16M4 10H16'
                    stroke={inputValue === 24 ? '#949EAE' : '#EFF2F5'}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        <button
          className={cn(
            'hover:bg-grey-100 h-11 w-full rounded-md bg-blue-500 hover:text-gray-800',
            'cursor-pointer'
          )}
          onClick={() => handlePayClick(plan.id)}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
