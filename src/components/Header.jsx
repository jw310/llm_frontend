import { useState, useRef, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { SmallSpinner } from '@/components/loader/Spinner.jsx';
import earthIcon from '@/assets/ic_language.svg';
import ChevronLeft from '@/assets/chevron-left.svg';
import ChevronDown from '@/assets/chevron-down.svg';
import Language from '@/components/modal/Language';

import { AuthContext } from '@/context/auth';
import { cn } from '@/utils/clsx';

function Header() {
  const { t, i18n } = useTranslation();
  const { userInfo, isUserInfoLoading, isUserInfoFetching } = useContext(AuthContext);

  const [openLang, setOpenLang] = useState(false);

  const headerRef = useRef(null);
  const langRef = useRef(null);
  // const changeLanguage = (lang) => {
  //   console.log(`Changing language to: ${lang}`);
  //   i18n.changeLanguage(lang);
  // }

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

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (
  //       langRef.current &&
  //       !langRef.current.contains(e.target) &&
  //       !headerRef.current
  //     ) {
  //       setOpenLang(false);
  //     }
  //   };
  //   // 監聽整個畫面
  //   document.addEventListener('click', handleClickOutside);
  //   // 移除監聽
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <header ref={headerRef} className='flex h-fit w-full items-center justify-end p-3'>
      <Language
        languages={languages}
        openLang={openLang}
        setOpenLang={setOpenLang}
        locale={i18n.language}
        langRef={langRef}
      />
      <div className='flex items-center gap-2'>
        <div className='h-12 w-12 overflow-hidden rounded-full'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNKpraw7wORnxRk-XOSZKUGbfFM__DXxj-UQ&s'
            alt='avatar'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-[11px] text-slate-500'>Welcome back,</p>
          {isUserInfoLoading || isUserInfoFetching ? (
            <SmallSpinner />
          ) : (
            <h5 className='font-medium'>{userInfo?.username}</h5>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;