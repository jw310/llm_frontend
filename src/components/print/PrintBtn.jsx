import { useReactToPrint } from 'react-to-print';

import { PrinterIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/clsx';
import './print.css';

function PrintBtn({ printContent, documentTitle }) {
  const handlePrint = useReactToPrint({
    documentTitle: documentTitle || 'documentTitle',
    contentRef: printContent,
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
    </div>
  );
}

export default PrintBtn;
