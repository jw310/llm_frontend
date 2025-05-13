import { useContext } from 'react';

import { SmallSpinner } from '@/components/loader/Spinner.jsx';

import { AuthContext } from '@/context/auth';

function Header() {
  const { userInfo, isUserInfoLoading, isUserInfoFetching } = useContext(AuthContext);
  return (
    <header className='flex h-fit w-full items-center justify-end p-3'>
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
            <h5 className='font-medium'>{userInfo?.name}</h5>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;