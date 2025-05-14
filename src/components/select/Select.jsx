import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChevronDown from '@/assets/chevron-down.svg';
import ChevronLeft from '@/assets/chevron-left.svg';

import { cn } from '@/utils/clsx.js';

function Select({
  options,
  name,
  value,
  onChange,
  placeholder,
}) {
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
      className={cn('relative flex h-[46px] w-full items-center gap-2')}
      onClick={() => setOpenSelect((currentOpenSelect) => !currentOpenSelect)}
    >
      <div
        className={cn('relative flex h-full w-full cursor-pointer items-center rounded-md border-2 border-gray-700 bg-grey-800 px-[14px] py-[10px] text-sm font-medium lg:text-base',
          `${!value ? 'text-grey-400' : ''} ${ !value ? 'border-secondary-red-500' : 'border-grey-700'}`)}
      >
        {showSelectedOption()}
        {openSelect && (
          <div className='absolute left-0 top-full z-20 mt-[2px] f-hit w-full rounded bg-gray-700 shadow-custom'>
            <ul>
              {options?.map((el) =>
                value === el.value ? (
                  <li
                    key={el.value}
                    className='text-body flex cursor-pointer items-center gap-1 px-[14px] py-[10px] font-bold text-primary-yellow-500 hover:bg-grey-600'
                    onClick={() => onChange(el.value)}
                  >
                    <img
                      src={ChevronLeft}
                      alt='chevron-left-icon'
                      width={24}
                      height={24}
                    />
                    {name === 'role' ? `${t(el.name)}` : t(el.name)}
                  </li>
                ) : (
                  <li
                    key={el.value}
                    className='text-body cursor-pointer px-[14px] py-[10px] text-grey-100 hover:bg-grey-600'
                    onClick={() => onChange(el.value)}
                  >
                    {name === 'role' ? `${t(el.name)}` : t(el.name)}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      <img
        src={ChevronDown}
        alt='chevrondown-icon'
        width={24}
        height={24}
        className={`absolute right-[14px] cursor-pointer
          ${openSelect ? '' : 'rotate-180'}
        `}
      />
    </div>
  );
}

export default Select;