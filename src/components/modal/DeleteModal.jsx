import ModalBackground from './ModalBackground';

import { cn } from '@/utils/clsx.js';

function DeleteModal({ onCloseClick, onDeleteClick, selectedData }) {
  return (
    <>
      <dialog
        className={cn(
          'top-1/2 left-1/2 z-20 flex h-fit w-[350px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between gap-6 rounded-md bg-white p-10'
        )}
      >
        <p className={cn('text-xl')}>
          {'deleteDesc'}
          <span className={cn('font-bold')}>「{selectedData.name}」</span>？
        </p>
        <footer
          className={cn('flex items-center justify-center gap-2 font-medium')}
        >
          <button
            onClick={onCloseClick}
            className={cn(
              'rounded bg-gray-600 p-[10px] text-gray-200 hover:bg-gray-300 hover:text-gray-600'
            )}
          >
            {'Cancel'}
          </button>
          <button
            onClick={onDeleteClick}
            className={cn(
              'rounded bg-amber-600 p-[10px] text-gray-200 hover:bg-amber-200 hover:text-red-500'
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

export default DeleteModal;
