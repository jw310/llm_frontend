import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/clsx';

function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    // 監聽整個畫面
    document.addEventListener('click', handleClickOutside);
    // 移除監聽
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef, setOpen]);

  return (
    <div
      ref={dropdownRef}
      role='button'
      tabIndex='0'
      className={cn(
        'relative flex w-fit items-center rounded-2xl p-3 text-base font-normal',
        'font-noto-sans-tc cursor-pointer bg-[#91BBE8] text-white focus:outline-none'
      )}
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setOpen(!open);
        }
      }}
    >
      {open && (
        <div
          aria-label='menu'
          role='menu'
          className={cn(
            'font-noto-sans-tc absolute top-13 -left-16 z-20 flex w-[150px] flex-col rounded-xl whitespace-nowrap',
            'border-1 border-[#C2C3C7] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]'
          )}
        >
          <div className={cn('border-b-1 border-[#C2C3C7] text-center')}>
            <button
              className={cn(
                'w-fit rounded-2xl p-3 text-base font-normal text-black'
              )}
            >
              {t('header.finish')}
            </button>
          </div>
          <div className={cn('text-center')}>
            <button
              className={cn(
                'w-fit rounded-2xl p-3 text-base font-normal text-black'
              )}
            >
              {t('header.logout')}
            </button>
          </div>
        </div>
      )}
      {t('header.applicant')}
    </div>
  );
}

export default Dropdown;
