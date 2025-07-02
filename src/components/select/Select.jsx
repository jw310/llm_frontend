import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { cn } from '@/utils/clsx.js';

function Select({ options, name, value, onChange, placeholder, customStyle }) {
  const { t } = useTranslation();
  const [openSelect, setOpenSelect] = useState(false);

  const showSelectedOption = () => {
    const selectedOption = options?.find((el) => el.value === value);
    if (!selectedOption) return placeholder;
    return name === 'role'
      ? `${t(selectedOption.name)}`
      : t(selectedOption.name);
  };

  return (
    <div
      className={cn('relative flex h-[48px] w-full items-center gap-2')}
      onClick={() => setOpenSelect((currentOpenSelect) => !currentOpenSelect)}
    >
      <div
        className={cn(
          'relative flex h-full w-full cursor-pointer items-center rounded-md bg-white px-[14px] py-[10px] text-sm font-medium lg:text-base',
          'focus-outline-none border-1 border-gray-300 outline-none',
          `${value ? 'text-black' : 'text-gray-400'}`,
          customStyle
        )}
      >
        {showSelectedOption()}
        {openSelect && (
          <div
            className={cn(
              'f-hit absolute top-full left-0 z-20 w-full rounded bg-gray-200 text-white'
            )}
          >
            <ul>
              {options?.map((el) =>
                value === el.value ? (
                  <li
                    key={el.value}
                    className={cn(
                      'text-body hover:bg-grey-600 flex cursor-pointer items-center gap-1 px-3 py-[10px] font-bold text-yellow-500'
                    )}
                    onClick={() => onChange(el.value)}
                  >
                    <ChevronRightIcon
                      alt='chevron-right-icon'
                      width={24}
                      height={24}
                    />
                    {/* {name === 'role' ? `${t(el.name)}` : t(el.name)} */}
                    {el.name}
                  </li>
                ) : (
                  <li
                    key={el.value}
                    className={cn(
                      'cursor-pointer px-[14px] py-[10px] text-base text-gray-100 hover:bg-gray-600'
                    )}
                    onClick={() => onChange(el.value)}
                  >
                    {/* {name === 'role' ? `${t(el.name)}` : t(el.name)} */}
                    {el.name}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      <ChevronDownIcon
        alt='Chevron-down-icon'
        width={24}
        height={24}
        className={cn(
          'absolute right-[14px] cursor-pointer text-gray-300',
          openSelect ? '' : 'rotate-180'
        )}
      />
    </div>
  );
}

export default Select;
