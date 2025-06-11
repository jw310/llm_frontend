import { useState } from 'react';

import Table from '@/components/table/Table';
import Pagination from '@/components/pagination/Pagination';

import { cn } from '@/utils/clsx';
function RecentPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const tableHead = ['1', '2', '3', '4', '5', '6'];
  const tableData = [['1', '2', '3', '4', '5', '6']];

  const pageInfo = {
    totalPages: 10,
    currentPage: 1,
  };
  const setCurrentPageHandler = (type) => {
    if (type === 'previous') {
      setCurrentPage((prev) => {
        if (prev === 1) return 1;
        return prev - 1;
      });
    } else {
      setCurrentPage((prev) => {
        if (prev === pageInfo.totalPages) return pageInfo.totalPages;
        return prev + 1;
      });
    }
  };

  return (
    <div
      className={cn(
        'flex h-[calc(100vh-80px)] flex-col rounded-xl bg-slate-50 shadow'
      )}
    >
      <Table tableHead={tableHead} tableData={tableData} />
      <Pagination
        totalPages={pageInfo.totalPages}
        currentPage={currentPage}
        onClick={setCurrentPageHandler}
      />
    </div>
  );
}

export default RecentPage;
