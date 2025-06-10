import { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';

import chevronDownIcon from '@/assets/chevron-down.svg';
import chevronLeftIcon from '@/assets/chevron-left.svg';
import earthIcon from '@/assets/ic_language.svg';

import { cn } from '@/utils/clsx';
import { extractPathname } from '@/utils/index.js';

function Language({languages, locale}) {
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef(null);

  const navigate = useNavigate();
  const pathname = extractPathname(useLocation().pathname);

  // 一般語系切換
  // const { i18n } = useTranslation();
  // const changeLanguage = (locale) => {
  //   i18n.changeLanguage(locale);
  // }

  // url 加上語系路徑的語系切換
  const changeLanguageParams = (newLocale) => {
    // window.location.pathname 當前路徑
    const path = window.location.pathname.replace(`/${pathname}`, `/${newLocale}`)
    navigate(path)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langRef.current && !langRef.current.contains(e.target)
      ) {
        setOpenLang(false);
      }
    };
    // 監聽整個畫面
    document.addEventListener('click', handleClickOutside);
    // 移除監聽
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [langRef, setOpenLang]);

  return (
    <div
      ref={langRef}
      role='button'
      tabIndex='0'
      className={cn('relative flex cursor-pointer items-center gap-1 text-grey-300')}
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
        className={cn('h-6 w-6')}
      />
      <img
        src={chevronDownIcon}
        alt='chevronDown-icon'
        width={24}
        height={24}
        className={cn(openLang ? '' : 'rotate-180')}
      />
      {openLang && (
        <ul
          aria-label='language menu'
          role='menu'
          className={cn('absolute -left-18 top-8 flex w-[122px] flex-col bg-gray-300 py-2',
              'whitespace-nowrap rounded-md z-50'
          )}
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
                <button className={cn('flex w-full justify-start px-[14px] py-[10px] hover:bg-gray-500 cursor-pointer',
                    el.id === locale ? 'font-bold text-primary-yellow-500' : '')}
                  onClick={() => {
                    // changeLanguage(el.id);
                    changeLanguageParams(el.id);
                    setOpenLang(false);
                  }}>
                  {el.id === locale && (
                    <img
                      src={chevronLeftIcon}
                      alt='chevronLeft-icon'
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