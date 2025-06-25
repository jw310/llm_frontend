import ModalBackground from './ModalBackground';

import { cn } from '@/utils/clsx.js';

function Modal({ onCloseClick, onConfirmClick }) {
  return (
    <>
      <dialog
        className={cn(
          'font-noto-sans-tc top-1/2 left-1/2 z-20 flex h-fit w-[591px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between gap-6 rounded-xl bg-white px-30 py-18',
          'font-noto-sans-tc rounded-xl bg-white'
        )}
      >
        <button className={cn('absolute top-3 right-4')} onClick={onCloseClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='38'
            height='38'
            viewBox='0 0 38 38'
            fill='none'
          >
            <path
              d='M13.3434 13.3431L24.6571 24.6569M13.3434 24.6569L24.6571 13.3431'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <header className={cn('text-center text-2xl font-bold text-blue-950')}>
          {'Title'}
        </header>
        <main className={cn('flex w-full flex-col gap-3')}>
          <div className={cn('flex items-center justify-between text-xl')}>
            {'description'}
          </div>
          <ul className={cn('ml-8 list-disc text-base font-normal')}>
            <li>
              <p>{'one'}</p>
            </li>
            <li>
              <p>{'two'}</p>
            </li>
            <li>
              <p>{'three'}</p>
            </li>
          </ul>
          {/* <hr className={cn("mt-2 w-full border-b-1 border-gray-900")} /> */}
        </main>
        <footer
          className={cn(
            'flex items-center justify-center gap-3 leading-4 font-bold text-[#2D4057]'
          )}
        >
          <button
            onClick={onCloseClick}
            className={cn(
              'rounded-2xl bg-[#E5EDF9] p-[10px_24px]',
              'shadow-custom cursor-pointer'
            )}
          >
            {'Cancel'}
          </button>
          <button
            onClick={onConfirmClick}
            className={cn(
              'rounded-2xl bg-[#E5EDF9] p-[10px_24px]',
              'shadow-custom cursor-pointer'
            )}
          >
            {'Confirm'}
          </button>
        </footer>
      </dialog>
      <ModalBackground />
    </>
  );
}

export default Modal;
