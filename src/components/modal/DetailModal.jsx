import { useTranslation } from 'react-i18next';

import ModalBackground from './ModalBackground';

import { cn } from '@/utils/clsx.js';

function DetailModal({ onCloseClick, onConfirmClick }) {
  const { t } = useTranslation();
  return (
    <>
      <dialog className={cn('top-1/2 z-10 flex h-fit w-[560px] -translate-y-1/2 flex-col items-center justify-between gap-6 rounded-xl bg-grey-100 p-10')}>
        <header className={cn('text-2xl font-bold text-blue-950')}>
          {t('plan.orderConfirm')}
        </header>
        <main className={cn('flex w-full flex-col gap-3')}>
          <div className={cn('flex items-center justify-between text-xl text-grey-500')}>
            <label>{t('plan.model')}：</label>
            <p>{t('plan.train')}</p>
          </div>
          <div className={cn('flex items-center justify-between text-xl text-grey-500')}>
            <label>{t('plan.unitPrice')}</label>
            <p>NT$100,000</p>
          </div>
          <div className={cn('flex items-center justify-between text-xl text-grey-500')}>
            <label>{t('plan.number')}</label>
            <p>1</p>
          </div>
          <hr className={cn('border-b-1 mt-2 w-full border-grey-900')} />
          <div className={cn('flex items-center justify-between text-2xl font-bold text-grey-500')}>
            <label>{t('plan.total')}</label>
            <p>NT$100,000</p>
          </div>
        </main>
        <footer className={cn('flex items-center justify-center gap-2 font-medium')}>
          <button
            onClick={onCloseClick}
            className={cn('rounded bg-grey-600 p-[10px] text-grey-200 hover:bg-grey-300 hover:text-grey-600')}
          >
            {t('plan.cancel')}
          </button>
          <button
            onClick={onConfirmClick}
            className={cn('rounded bg-yellow-400 p-[10px] text-grey-800 hover:bg-yellow-200 hover:text-yellow-600')}
          >
            {t('plan.confirm')}
          </button>
        </footer>
      </dialog>
      <ModalBackground />
    </>
  );
}

export default DetailModal;
