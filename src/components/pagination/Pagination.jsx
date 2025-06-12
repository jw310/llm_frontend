import { useState, useRef, useEffect, useCallback } from 'react';

import leftIcon from '@/assets/left_icon.svg';
import rightIcon from '@/assets/right_icon.svg';
import Pager from './Pager';

import { cn } from '@/utils/clsx.js';

const Pagination = ({ pageNum, onGetPage }) => {
  const [totalPages, setTotalPages] = useState(pageNum?.total_pages || 0);
  const [currentPage, setCurrentPage] = useState(pageNum?.current_page || 1);

  useEffect(() => {
    if (pageNum) {
      setTotalPages(pageNum.total_pages);
      setCurrentPage(pageNum.current_page);
    }
  }, [pageNum]);

  const setPage = useCallback(
    async (page) => {
      try {
        let newPage;
        if (page < 1) {
          newPage = 1;
        } else if (page > totalPages) {
          newPage = totalPages;
        } else {
          newPage = page;
        }
        setCurrentPage(newPage);
        onGetPage?.(newPage);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [totalPages, onGetPage]
  );

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
        {/* Previous */}
        <button
          className={cn(
            'bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400',
            'cursor-pointer rounded-md border shadow-sm transition hover:bg-gray-200 hover:text-slate-500',
            pageNum?.has_pre
              ? 'hover:bg-gray-100'
              : 'cursor-not-allowed opacity-50'
          )}
          onClick={() => {
            if (pageNum?.has_pre) {
              setPage(currentPage - 1);
            }
          }}
        >
          <img
            src={leftIcon}
            alt='leftIcon'
            width={24}
            height={24}
            className={cn(!pageNum?.has_pre ? 'pointer-events-none' : '')}
          />
        </button>
        {/* Next */}
        <button
          className={cn(
            'bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400',
            'cursor-pointer rounded-md border shadow-sm transition hover:bg-gray-200 hover:text-slate-500',
            pageNum?.has_next
              ? 'hover:bg-gray-100'
              : 'cursor-not-allowed opacity-50'
          )}
          onClick={() => {
            if (pageNum?.has_next) {
              setPage(currentPage + 1);
            }
          }}
        >
          <img
            src={rightIcon}
            alt='rightIcon'
            width={24}
            height={24}
            className={cn(!pageNum?.has_next ? 'pointer-events-none' : '')}
          />
        </button>
      </div>
    </div>
  );
};

// use Pager 中間頁數元件
// const Pagination = ({ pageNum, onGetPage }) => {
//   const [totalPages, setTotalPages] = useState(pageNum?.total_pages || 0);
//   const [currentPage, setCurrentPage] = useState(pageNum?.current_page || 1);
//   const pagerRef = useRef(null);

//   // Update state when pageNum prop changes
//   useEffect(() => {
//     if (pageNum) {
//       setTotalPages(pageNum.total_pages);
//       setCurrentPage(pageNum.current_page);
//     }
//   }, [pageNum]);

//   // Handle previous/next page navigation
//   const setPage = useCallback(
//     async (page) => {
//       try {
//         let newPage;
//         if (page < 1) {
//           newPage = 1;
//         } else if (page > totalPages) {
//           newPage = totalPages;
//         } else {
//           newPage = page;
//         }

//         setCurrentPage(newPage);
//         onGetPage?.(newPage);
//       } catch (error) {
//         console.log('error:', error);
//       }
//     },
//     [totalPages, onGetPage]
//   );

//   // Handle page change from Pager component
//   const pageChange = useCallback(
//     (page) => {
//       setCurrentPage(page);
//       onGetPage?.(page);
//     },
//     [onGetPage]
//   );

//   return (
//     <div>
//       <nav aria-label='Page navigation'>
//         <ul className={cn('mx-[20px] my-[30px] flex flex-wrap')}>
//           {/* Previous */}
//           <li
//             className={cn(
//               'mr-2 h-7 w-7 cursor-pointer text-center leading-7',
//               !pageNum?.has_pre
//                 ? 'cursor-not-allowed opacity-50'
//                 : 'hover:bg-gray-100'
//             )}
//           >
//             <a
//               href='#'
//               aria-label='Previous'
//               onClick={(e) => {
//                 e.preventDefault();
//                 if (pageNum?.has_pre) {
//                   setPage(currentPage - 1);
//                 }
//               }}
//               className={cn(
//                 'block h-full w-full',
//                 !pageNum?.has_pre ? 'pointer-events-none' : ''
//               )}
//             >
//               <span aria-hidden='true'>&lt;</span>
//               <span className={cn('sr-only')}>Previous</span>
//             </a>
//           </li>

//           {/* Center - Pager component */}
//           <Pager
//             ref={pagerRef}
//             totalPages={totalPages}
//             defaultCurrentPage={currentPage}
//             onGetPage={pageChange}
//           />

//           {/* Next */}
//           <li
//             className={cn(
//               'mr-2 h-7 w-7 cursor-pointer text-center leading-7',
//               !pageNum?.has_next
//                 ? 'cursor-not-allowed opacity-50'
//                 : 'hover:bg-gray-100'
//             )}
//           >
//             <a
//               href='#'
//               aria-label='Next'
//               onClick={(e) => {
//                 e.preventDefault();
//                 if (pageNum?.has_next) {
//                   setPage(currentPage + 1);
//                 }
//               }}
//               className={cn(
//                 'block h-full w-full',
//                 !pageNum?.has_next ? 'pointer-events-none' : ''
//               )}
//             >
//               <span aria-hidden='true'>&gt;</span>
//               <span className={cn('sr-only')}>Next</span>
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

export default Pagination;
