import { useState, useRef, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Language from '@/components/modal/Language';
import { SmallSpinner } from '@/components/loader/Spinner.jsx';

import { AuthContext } from '@/context/auth';
import { cn } from '@/utils/clsx';

function Header() {
  const { t, i18n } = useTranslation();
  const [openLang, setOpenLang] = useState(false);
  const { userInfo, isUserInfoLoading, isUserInfoFetching } = useContext(AuthContext);

  const headerRef = useRef(null);
  const langRef = useRef(null);

  const languages = [
    {
      id: 'zh-TW',
      title: '繁體中文',
    },
    {
      id: 'en-US',
      title: 'English',
    },
  ];

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
  }, []);

  return (
    <header ref={headerRef} className={cn('flex h-fit w-full items-center justify-end p-3')}>
      <Language
        languages={languages}
        openLang={openLang}
        setOpenLang={setOpenLang}
        locale={i18n.language}
        langRef={langRef}
      />
      <div className={cn('flex items-center gap-2')}>
        <div className={cn('h-12 w-12 overflow-hidden rounded-full')}>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNKpraw7wORnxRk-XOSZKUGbfFM__DXxj-UQ&s'
            alt='avatar'
            className={cn('h-full w-full object-cover')}
          />
        </div>
        <div className={cn('flex flex-col gap-1')}>
          <p className={cn('text-[11px] text-slate-500')}>{t('header.welcome')},</p>
          {isUserInfoLoading || isUserInfoFetching ? (
            <SmallSpinner />
          ) : (
            <h5 className={cn('font-medium')}>{userInfo?.username}</h5>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;