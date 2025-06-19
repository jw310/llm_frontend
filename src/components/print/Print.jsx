import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { PrinterIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/clsx';
import './print.css';

function PrintBtn({ children, documentTitle }) {
  const printContentRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: documentTitle || 'documentTitle',
    contentRef: printContentRef,
    // onAfterPrint: () => {
    //   console.log('Printed!');
    // },
  });

  return (
    <div className={cn('flex h-fit w-full flex-col')}>
      <button
        className={cn(
          'mr-5 flex h-fit w-fit items-center justify-between gap-2 self-end bg-indigo-300 px-6 py-2 text-lg',
          'cursor-pointer rounded-md hover:bg-indigo-600 hover:text-white'
        )}
        onClick={handlePrint}
      >
        <PrinterIcon className='h-6 w-6' />
        Print
      </button>
      {/* Print Content */}
      <div ref={printContentRef} className={cn('h-full w-full')}>
        <div>
          <h1 className='text-center'>{documentTitle}</h1>
        </div>
        {children || (
          <div>
            <div className='hidden print:block'>僅列印時顯示</div>
            <div className='print:hidden'>僅畫面上顯示</div>
            <div className='p-10'>111</div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='mb-8'>
                <h2 className='text-lg font-bold'>頁面 {i + 1}</h2>
                <p>{'模擬內容。'.repeat(120)}</p>
                {i < 4 && <div className='page-break' />}
              </div>
            ))}
          </div>
        )}
        <footer>
          <p className='text-right'>
            列印時間：{new Date().toLocaleString('zh-TW')}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default PrintBtn;
