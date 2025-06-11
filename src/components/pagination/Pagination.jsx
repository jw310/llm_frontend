import leftIcon from '@/assets/left_icon.svg';
import rightIcon from '@/assets/right_icon.svg';

import { cn } from '@/utils/clsx.js';

const Pagination = ({ totalPages, currentPage, onClick }) => {
  return (
    <div className={cn('flex items-center justify-center')}>
      <div className={cn('flex items-center justify-center space-x-4')}>
        <div className={cn('flex items-center justify-center text-slate-500')}>
          <span
            className={cn(
              'mr-2 flex h-10 w-[58px] items-center justify-center rounded-md',
              'border border-[#EDEFF1] bg-gray-100 text-base text-[#838995]',
              'hover:bg-primary hover:border-primary hover:text-black'
            )}
          >
            {currentPage}
          </span>
          <span>of {totalPages}</span>
        </div>
        <button
          className={cn(
            'bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400',
            'cursor-pointer rounded-md border shadow-sm transition hover:bg-gray-200 hover:text-slate-500'
          )}
          onClick={() => {
            onClick('previous');
          }}
        >
          <img src={leftIcon} alt='leftIcon' width={24} height={24} />
        </button>
        <button
          className={cn(
            'bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400',
            'cursor-pointer rounded-md border shadow-sm transition hover:bg-gray-200 hover:text-slate-500'
          )}
          onClick={() => {
            onClick('next');
          }}
        >
          <img src={rightIcon} alt='rightIcon' width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
