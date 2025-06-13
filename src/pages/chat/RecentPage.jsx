import { useState } from 'react';

import Table from '@/components/table/Table';
import Pagination from '@/components/pagination/Pagination';
import Accordion from '@/components/accordion/Accordion';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';

import { cn } from '@/utils/clsx';
function RecentPage() {
  const qa = {
    question: 'What is the difference between a LLM and a GPT?',
    answer:
      'A LLM is a language model that is trained on a large dataset of text to generate human-like text. A GPT is a language model that is trained on a large dataset of text to generate human-like text.',
  };

  const tableHead = ['Data', 'Status', 'Title', ''];
  const tableData = [
    { date: '2025-06-01', state: 1, title: 'test' },
    { date: '2025-06-01', state: 2, title: 'test2' },
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
      {/* <Accordion header={qa.question} panel={qa.answer} /> */}
      <Breadcrumb />
      <Table tableHead={tableHead} tableData={tableData} />
      <Pagination pageNum={pageNum} onGetPage={handlePageChange} />
    </div>
  );
}

export default RecentPage;
