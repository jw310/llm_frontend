// import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import chevronDownIcon from '@/assets/chevron-down.svg';
import chevronLeftIcon from '@/assets/chevron-left.svg';
import earthIcon from '@/assets/ic_language.svg';

function Language({
  languages,
  openLang,
  setOpenLang,
  locale,
  langRef,
}) {

  const { t, i18n } = useTranslation();

  return (
    <div
      ref={langRef}
      role='button'
      tabIndex='0'
      className='relative flex cursor-pointer items-center gap-1 text-grey-300'
      onClick={() => setOpenLang(!openLang)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setOpenLang(!openLang);
        }
      }}
    >
      <img
        src={earthIcon}
        alt='earth-icon'
        width={24}
        height={24}
        className='h-6 w-6'
      />
      <img
        src={chevronDownIcon}
        alt='chevrondown-icon'
        width={24}
        height={24}
        className={openLang ? '' : 'rotate-180'}
      />
      {openLang && (
        <ul
          aria-label='language menu'
          role='menu'
          className='absolute -left-18 top-8 z-10 flex w-[122px] flex-col whitespace-nowrap rounded-md bg-gray-300 py-2 shadow-custom'
        >
          {languages.map((el) => (
            <ul
              role='menuitem'
              tabIndex='0'
              key={el.id}
              // href={pathname + '?' + searchParams.toString()}
              locale={el.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.click();
                }
              }}
            >
              <li>
                <button className={`flex w-full cursor-pointer justify-start px-[14px] py-[10px] hover:bg-grey-600 ${
                  el.id === locale ? 'font-bold text-primary-yellow-500' : ''
                }`}
                  onClick={() => {
                    i18n.changeLanguage(el.id);
                    setOpenLang(false);
                  }}>
                  {el.id === locale && (
                    <img
                      src={chevronLeftIcon}
                      alt='chevronleft-icon'
                      width={24}
                      height={24}
                    />
                  )}
                  {el.title}
                </button>
              </li>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Language;