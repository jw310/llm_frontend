import { useState } from 'react';

import PdfViewer from '@/components/PdfViewer.jsx';

import { cn } from '@/utils/clsx.js';

const PdfPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  return (
    <div className={cn('min-h-screen bg-gray-50 p-4')}>
      <div className={cn('mx-auto max-w-6xl')}>
        <div className={cn('mb-6')}>
          <h1 className={cn('mb-4 text-3xl font-bold text-gray-900')}>
            PDF Viewer
          </h1>
          <p className={cn('mb-4 text-gray-600')}>
            PDF viewer with page-level rendering using PDF.js
          </p>

          <div className={cn('mb-4 flex flex-col gap-4 sm:flex-row')}>
            <input
              type='url'
              placeholder='Input PDF URL...'
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className={cn(
                'flex-1 rounded-md border border-gray-300 px-4 py-2',
                'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
              )}
            />
            <button
              onClick={() => setPdfUrl('')}
              className={cn(
                'rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700'
              )}
            >
              Clear
            </button>
          </div>

          <div className={cn('flex flex-wrap gap-2')}>
            <button
              onClick={() => setPdfUrl('http://localhost:5173/test.pdf')}
              className={cn(
                'rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-200'
              )}
            >
              PDF Preview Example
            </button>
          </div>
        </div>

        <PdfViewer url={pdfUrl} />
      </div>
    </div>
  );
};

export default PdfPage;
