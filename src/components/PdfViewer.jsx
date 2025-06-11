import { useEffect, useRef, useState } from 'react';

import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

import { cn } from '@/utils/clsx';

const PdfViewer = ({ url }) => {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const canvasContainerRef = useRef(null);
  const destroyedRef = useRef(false);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
  }, []);

  // 渲染單個頁面
  const renderPage = async (page) => {
    if (destroyedRef.current || !canvasContainerRef.current) return;

    const viewport = page.getViewport({ scale });
    // 建立頁面容器
    const wrapper = document.createElement('div');
    // 建立 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.style.display = 'block';

    wrapper.appendChild(canvas);
    canvasContainerRef.current.appendChild(wrapper);

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    });
  };

  // load and render PDF
  useEffect(() => {
    if (!url) return;

    const loadPDF = async () => {
      setIsLoading(true);
      setError(null);
      destroyedRef.current = false;

      // clear the previous content
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = '';
      }

      try {
        const pdfDoc = await pdfjs.getDocument(url).promise;

        if (destroyedRef.current) return;

        setNumPages(pdfDoc.numPages);
        // render pages
        for (let num = 1; num <= pdfDoc.numPages; num++) {
          if (destroyedRef.current) break;

          const page = await pdfDoc.getPage(num);
          await renderPage(page);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        if (!destroyedRef.current) {
          setError('Unable to load PDF file');
          setIsLoading(false);
        }
      }
    };

    loadPDF();

    // clear function
    return () => {
      destroyedRef.current = true;
    };
  }, [url, scale]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  const handleDownload = () => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!url) {
    return (
      <div
        className={cn(
          'flex h-screen w-full items-center justify-center rounded-lg bg-gray-100'
        )}
      >
        <div className={cn('text-center')}>
          <p className={cn('mx-auto mb-4 h-12 w-12 text-gray-400')} />
          <p className={cn('text-lg text-gray-500')}>Please Provide PDF URL</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm'
      )}
    >
      {/* tools */}
      <div
        className={cn(
          'flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3'
        )}
      >
        <div className={cn('flex items-center space-x-2')}>
          <button
            onClick={handleZoomOut}
            disabled={isLoading}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            title='Zoom out'
          >
            <MagnifyingGlassMinusIcon className={cn('inline-block h-6 w-6')} />
          </button>

          <span
            className={cn(
              'min-w-[4rem] rounded-md border border-gray-300 bg-white px-3 py-1 text-center text-sm font-medium text-gray-700'
            )}
          >
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={isLoading}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            title='Zoom in'
          >
            <MagnifyingGlassPlusIcon className={cn('inline-block h-6 w-6')} />
          </button>

          <button
            onClick={handleResetZoom}
            disabled={isLoading}
            className={cn(
              'rounded-md px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            title='Reset'
          >
            Reset
          </button>
        </div>

        <div className={cn('flex items-center space-x-2')}>
          {numPages > 0 && (
            <span className={cn('text-sm text-gray-600')}>
              Total {numPages} Pages
            </span>
          )}

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            title='Download'
          >
            <DocumentArrowDownIcon className={cn('inline-block h-6 w-6')} />
          </button>
        </div>
      </div>

      {/* PDF content */}
      <div
        className={cn(
          `h-[calc(100vh_-_80px)] flex-1 overflow-y-auto bg-gray-100`
        )}
      >
        {isLoading && (
          <div className={cn('flex h-64 items-center justify-center')}>
            <div className={cn('flex flex-col items-center')}>
              <div
                className={cn(
                  'mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'
                )}
              ></div>
              <p className={cn('text-gray-600')}>Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className={cn('flex h-64 items-center justify-center')}>
            <div className={cn('text-center')}>
              <div className={cn('mb-4 text-4xl text-red-400')}>⚠️</div>
              <p className={cn('mb-4 text-red-600')}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  'rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700'
                )}
              >
                Reload
              </button>
            </div>
          </div>
        )}

        {/* PDF wrapper */}
        <div
          ref={canvasContainerRef}
          className={cn('flex flex-col items-center space-y-4 p-4')}
          style={{ '--scale-factor': scale }}
        />
      </div>

      {/* status */}
      <div
        className={cn(
          'border-t border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600'
        )}
      >
        <div className={cn('flex items-center justify-between')}>
          <span>Zoom ratio: {Math.round(scale * 100)}%</span>
          <span className={cn('text-xs text-gray-500')}>
            {isLoading
              ? 'Loading...'
              : numPages > 0
                ? `Loaded ${numPages} page`
                : 'Ready to load'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
