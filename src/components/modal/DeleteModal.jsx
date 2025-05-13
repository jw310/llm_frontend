import ModalBackground from './ModalBackground';
import { useTranslation } from 'react-i18next';

function DeleteModal({ onCloseClick, onDeleteClick, selectedData }) {
  const { t } = useTranslation();
  return (
    <>
      <dialog className='top-1/2 z-10 flex h-fit w-[340px] -translate-y-1/2 flex-col items-center justify-between gap-6 rounded-xl bg-grey-100 p-10'>
        <p className='text-xl'>
          {t('knowledge.deleteDesc')}
          <span className='font-bold'>「{selectedData.name}」</span>？
        </p>
        <footer className='flex items-center justify-center gap-2 font-medium'>
          <button
            onClick={onCloseClick}
            className='rounded bg-grey-600 p-[10px] text-grey-200 hover:bg-grey-300 hover:text-grey-600'
          >
            {t('knowledge.cancel')}
          </button>
          <button
            onClick={onDeleteClick}
            className='rounded bg-red-600 p-[10px] text-grey-200 hover:bg-red-200 hover:text-red-500'
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
