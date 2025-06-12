import { useState, useEffect, useCallback, useMemo } from 'react';

import { cn } from '@/utils/clsx';

const Pager = ({
  totalPages,
  defaultCurrentPage = 1,
  centerSize = 5,
  jumpSize = 5,
  onGetPage,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

  // Watch for changes in defaultCurrentPage
  useEffect(() => {
    setCurrentPage(defaultCurrentPage);
  }, [defaultCurrentPage]);

  // Calculate center pages
  const centerPages = useMemo(() => {
    let centerPage = currentPage;

    // If current page is greater than totalPages - 3, set center to totalPages - 3
    if (currentPage > totalPages - 3) {
      centerPage = totalPages - 3;
    }

    // If current page is less than or equal to 4, set center to 4
    if (currentPage < 4) {
      centerPage = 4;
    }

    // If total pages is small, show all pages
    if (totalPages <= centerSize + 2) {
      const centerArr = [];
      for (let i = 2; i < totalPages; i++) {
        centerArr.push(i);
      }
      return centerArr;
    } else {
      // For large total pages, only show center pages
      const centerArr = [];
      for (let i = centerPage - 2; i <= centerPage + 2; i++) {
        centerArr.push(i);
      }
      return centerArr;
    }
  }, [currentPage, totalPages, centerSize]);

  // Handle page selection
  const getPage = useCallback(
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

  // Expose currentPage to parent via ref (React equivalent of Vue's ref)
  useEffect(() => {
    // This mimics the Vue ref functionality for parent component access
  }, [currentPage]);

  return (
    <div>
      <nav aria-label='Page navigation'>
        <ul className='flex flex-wrap'>
          {/* First page */}
          {totalPages > 1 && (
            <li
              className={`mr-3 h-7 w-7 cursor-pointer px-2 text-center leading-7 ${
                currentPage === 1
                  ? 'border border-[#5D86AF] bg-[#5D86AF] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getPage(1);
                }}
                className='block h-full w-full'
              >
                <span aria-hidden='true'>1</span>
                <span className='sr-only'>First page</span>
              </a>
            </li>
          )}

          {/* Left ellipsis */}
          {totalPages > centerSize + 2 &&
            currentPage - centerSize / 2 - 1 > 1 && (
              <li className='mr-3 h-7 w-7 cursor-pointer px-2 text-center leading-7 hover:bg-gray-100'>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    getPage(currentPage - jumpSize);
                  }}
                  className='block h-full w-full'
                >
                  ...
                </a>
              </li>
            )}

          {/* Center pages */}
          {centerPages.map((page) => (
            <li
              key={page}
              className={`mr-3 h-7 w-7 cursor-pointer px-2 text-center leading-7 ${
                page === currentPage
                  ? 'border border-[#5D86AF] bg-[#5D86AF] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getPage(page);
                }}
                className='block h-full w-full'
              >
                {page}
              </a>
            </li>
          ))}

          {/* Right ellipsis */}
          {totalPages > centerSize + 2 &&
            currentPage + centerSize / 2 + 1 < totalPages && (
              <li className='mr-3 h-7 w-7 cursor-pointer px-2 text-center leading-7 hover:bg-gray-100'>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    getPage(currentPage + jumpSize);
                  }}
                  className='block h-full w-full'
                >
                  ...
                </a>
              </li>
            )}

          {/* Last page */}
          <li
            className={`mr-3 h-7 w-7 cursor-pointer px-2 text-center leading-7 ${
              currentPage === totalPages
                ? 'border border-[#5D86AF] bg-[#5D86AF] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                getPage(totalPages);
              }}
              className='block h-full w-full'
            >
              <span aria-hidden='true'>{totalPages}</span>
              <span className='sr-only'>Last page</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pager;
