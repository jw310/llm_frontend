import leftIcon from '@/assets/left_icon.svg';
import rightIcon from '@/assets/right_icon.svg';

import { cn } from '@/utils/clsx.js';

const Pagination = ({ totalPages, currentPage, onClick }) => {

  return (
      <div className={cn('flex items-center justify-center')}>
          <div className={cn("flex justify-center items-center space-x-4")}>
              <div className={cn("flex justify-center items-center text-slate-500")}>
                  <span className={cn("w-[58px] h-10 mr-2 flex items-center justify-center rounded-md",
                      "bg-gray-100 border border-[#EDEFF1] text-[#838995] text-base",
                      "hover:bg-primary hover:border-primary hover:text-black")}
                      >
                      { currentPage }
                  </span>
                  <span>of { totalPages }</span>
              </div>
              <button className={cn("px-2 py-1 text-3xl leading-6 text-slate-400 bg-gray-100",
                "transition border rounded-md shadow-sm hover:bg-gray-200 hover:text-slate-500 cursor-pointer")}
                onClick={() => { onClick('previous') }}
              >
                  <img
                      src={leftIcon}
                      alt="leftIcon"
                      width={24}
                      height={24}
                  />
              </button>
              <button className={cn("px-2 py-1 text-3xl leading-6 text-slate-400 bg-gray-100",
                "transition border rounded-md hover:bg-gray-200 hover:text-slate-500 shadow-sm cursor-pointer")}
                onClick={() => { onClick('next') }}
              >
                <img
                    src={rightIcon}
                    alt="rightIcon"
                    width={24}
                    height={24}
                />
              </button>
          </div>
    </div>
  );
};

export default Pagination;