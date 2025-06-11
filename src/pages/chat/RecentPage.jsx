import { useState } from 'react';

import Pagination from '@/components/pagination/Pagination';

import { cn } from '@/utils/clsx';
function RecentPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageInfo = {
    totalPages: 10,
    currentPage: 1
  }

  const setCurrentPageHandler = (type) => {
    console.log(type)
    if (type === 'previous') {
      setCurrentPage((prev) => {
          if (prev === 1 ) return 1;
          return prev - 1;
      });
    } else {
      setCurrentPage((prev) => {
          if (prev ===  pageInfo.totalPages) return pageInfo.totalPages;
          return prev + 1;
      });
    }
  };

  return (
    <div className={cn('flex flex-col h-[calc(100vh-80px)] bg-slate-50 rounded-xl shadow')}>
      RecentPage

      <Pagination
        totalPages={pageInfo.totalPages}
        currentPage={currentPage}
        onClick={setCurrentPageHandler}
      />
    </div>
  );
}

export default RecentPage;