import ModalBackground from './ModalBackground';

import { cn } from '@/utils/clsx.js';

function DetailModal({ onCloseClick, onConfirmClick }) {
  return (
    <>
      <dialog
        className={cn(
          'top-1/2 left-1/2 z-20 flex h-fit w-[350px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between gap-6 rounded-md bg-white p-10'
        )}
      >
        <header className={cn('text-2xl font-bold text-blue-950')}>
          {'Confirm'}
        </header>
        <main className={cn('flex w-full flex-col gap-3')}>
          <div
            className={cn(
              'flex items-center justify-between text-xl text-gray-500'
            )}
          >
            <label>{'model'}：</label>
            <p>{'train'}</p>
          </div>
          <div
            className={cn(
              'flex items-center justify-between text-xl text-gray-500'
            )}
          >
            <label>{'unitPrice'}</label>
            <p>NT$100,000</p>
          </div>
          <div
            className={cn(
              'flex items-center justify-between text-xl text-gray-500'
            )}
          >
            <label>{'number'}</label>
            <p>1</p>
          </div>
          <hr className={cn('mt-2 w-full border-b-1 border-gray-900')} />
          <div
            className={cn(
              'flex items-center justify-between text-2xl font-bold text-gray-500'
            )}
          >
            <label>{'total'}</label>
            <p>NT$100,000</p>
          </div>
        </main>
        <footer
          className={cn('flex items-center justify-center gap-2 font-medium')}
        >
          <button
            onClick={onCloseClick}
            className={cn(
              'rounded bg-gray-600 p-[10px] text-gray-200 hover:bg-gray-300 hover:text-gray-600'
            )}
          >
            {'cancel'}
          </button>
          <button
            onClick={onConfirmClick}
            className={cn(
              'rounded bg-yellow-400 p-[10px] text-gray-800 hover:bg-yellow-200 hover:text-yellow-600'
            )}
          >
            {'confirm'}
          </button>
        </footer>
      </dialog>
      <ModalBackground />
    </>
  );
}

export default DetailModal;
