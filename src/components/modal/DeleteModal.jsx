import { useTranslation } from 'react-i18next';

import ModalBackground from './ModalBackground';

import { cn } from '@/utils/clsx.js';

function DeleteModal({ onCloseClick, onDeleteClick, selectedData }) {
  const { t } = useTranslation();
  return (
    <>
      <dialog
        className={cn(
          'bg-grey-100 top-1/2 z-10 flex h-fit w-[340px] -translate-y-1/2 flex-col items-center justify-between gap-6 rounded-xl p-10'
        )}
      >
        <p className={cn('text-xl')}>
          {t('knowledge.deleteDesc')}
          <span className={cn('font-bold')}>「{selectedData.name}」</span>？
        </p>
        <footer
          className={cn('flex items-center justify-center gap-2 font-medium')}
        >
          <button
            onClick={onCloseClick}
            className={cn(
              'bg-grey-600 text-grey-200 hover:bg-grey-300 hover:text-grey-600 rounded p-[10px]'
            )}
          >
            {t('knowledge.cancel')}
          </button>
          <button
            onClick={onDeleteClick}
            className={cn(
              'text-grey-200 rounded bg-red-600 p-[10px] hover:bg-red-200 hover:text-red-500'
            )}
          >
            {t('knowledge.confirm')}
          </button>
        </footer>
      </dialog>
      <ModalBackground />
    </>
  );
}

export default DeleteModal;
