import { useEffect, useRef, useState } from 'react';

import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  DocumentArrowDownIcon
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
      viewport: viewport
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
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
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
      <div className={cn('w-full h-screen flex items-center justify-center bg-gray-100 rounded-lg')}>
        <div className={cn("text-center")}>
          <p className={cn("w-12 h-12 text-gray-400 mx-auto mb-4")} />
          <p className={cn("text-gray-500 text-lg")}>Please Provide PDF URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full h-screen flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm')}>
      {/* tools */}
      <div className={cn("flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50")}>
        <div className={cn("flex items-center space-x-2")}>
          <button
            onClick={handleZoomOut}
            disabled={isLoading}
            className={cn("flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed")}
            title="Zoom out"
          >
            <MagnifyingGlassMinusIcon className={cn('inline-block h-6 w-6')} />
          </button>

          <span className={cn("px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md min-w-[4rem] text-center")}>
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={isLoading}
            className={cn("flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed")}
            title="Zoom in"
          >
            <MagnifyingGlassPlusIcon className={cn('inline-block h-6 w-6')} />
          </button>

          <button
            onClick={handleResetZoom}
            disabled={isLoading}
            className={cn("px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed")}
            title="Reset"
          >
            Reset
          </button>
        </div>

        <div className={cn("flex items-center space-x-2")}>
          {numPages > 0 && (
            <span className={cn("text-sm text-gray-600")}>
              Total {numPages} Pages
            </span>
          )}

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className={cn("flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed")}
            title="Download"
          >
            <DocumentArrowDownIcon className={cn('inline-block h-6 w-6')} />
          </button>
        </div>
      </div>

      {/* PDF content */}
      <div className={cn(`h-[calc(100vh_-_80px)] flex-1 bg-gray-100 overflow-y-auto`)}>
        {isLoading && (
          <div className={cn("flex items-center justify-center h-64")}>
            <div className={cn("flex flex-col items-center")}>
              <div className={cn("animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4")}></div>
              <p className={cn("text-gray-600")}>Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className={cn("flex items-center justify-center h-64")}>
            <div className={cn("text-center")}>
              <div className={cn("text-red-400 text-4xl mb-4")}>⚠️</div>
              <p className={cn("text-red-600 mb-4")}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={cn("px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors")}
              >
                Reload
              </button>
            </div>
          </div>
        )}

        {/* PDF wrapper */}
        <div
          ref={canvasContainerRef}
          className={cn("flex flex-col items-center p-4 space-y-4")}
          style={{ '--scale-factor': scale }}
        />
      </div>

      {/* status */}
      <div className={cn("px-4 py-2 border-t border-gray-200 bg-gray-50 text-sm text-gray-600")}>
        <div className={cn("flex justify-between items-center")}>
          <span>Zoom ratio: {Math.round(scale * 100)}%</span>
          <span className={cn("text-xs text-gray-500")}>
            {isLoading ? 'Loading...' : numPages > 0 ? `Loaded ${numPages} page` : 'Ready to load'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;