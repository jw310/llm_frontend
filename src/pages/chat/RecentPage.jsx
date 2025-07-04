import { useState } from 'react';

import Table from '@/components/table/Table';
import Pagination from '@/components/pagination/Pagination';

import { cn } from '@/utils/clsx';
function RecentPage() {
  const tableHead = ['Date', 'Title', 'Status', 'Function'];
  const tableData = [
    { date: '2025-06-01', title: 'test', status: 'enabled' },
    { date: '2025-06-01', title: 'test2', status: 'disabled' },
  ];

  const [pageNum, setPageNum] = useState({
    current_page: 1,
    total_pages: 10,
    has_pre: false,
    has_next: true,
  });

  const handlePageChange = (page) => {
    // console.log('Page changed to:', page);
    setPageNum((prev) => ({
      ...prev,
      current_page: page,
      has_pre: page > 1,
      has_next: page < prev.total_pages,
    }));
  };

  return (
    <div className={cn('flex flex-col rounded-xl bg-slate-50 shadow')}>
      <Table tableHead={tableHead} tableData={tableData} />
      <Pagination pageNum={pageNum} onGetPage={handlePageChange} />
    </div>
  );
}

export default RecentPage;
