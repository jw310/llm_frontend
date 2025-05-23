import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

// 設定 PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

pdfjsLib.GlobalWorkerOptions.workerSrc =
		'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.min.mjs';


const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // 處理檔案上傳
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    
    if (!uploadedFile) return;
    
    if (uploadedFile.type !== 'application/pdf') {
      setError('請選擇 PDF 檔案');
      return;
    }
    
    setFile(uploadedFile);
    setError('');
    loadPDF(uploadedFile);
  };

  // 載入 PDF
  const loadPDF = async (file) => {
    setLoading(true);
    try {
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        
        try {
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setCurrentPage(1);
          renderPage(pdf, 1);
        } catch (err) {
          setError('PDF 載入失敗: ' + err.message);
        }
        
        setLoading(false);
      };
      
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      setError('檔案讀取失敗: ' + err.message);
      setLoading(false);
    }
  };

  // 渲染指定頁面
  const renderPage = async (pdf, pageNum) => {
    if (!pdf || !canvasRef.current) return;
    
    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
    } catch (err) {
      setError('頁面渲染失敗: ' + err.message);
    }
  };

  // 當頁面或縮放比例改變時重新渲染
  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(pdfDoc, currentPage);
    }
  }, [pdfDoc, currentPage, scale]);

  // 上一頁
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 下一頁
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 放大
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3.0));
  };

  // 縮小
  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.25, 0.5));
  };

  // 重設縮放
  const resetZoom = () => {
    setScale(1.0);
  };

  // 清除檔案
  const clearFile = () => {
    setFile(null);
    setPdfDoc(null);
    setCurrentPage(1);
    setTotalPages(0);
    setError('');
    setScale(1.0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // 清除 canvas
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">PDF 預覽器</h2>
      
      {/* 檔案上傳區域 */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {file && (
            <button
              onClick={clearFile}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              清除
            </button>
          )}
        </div>
        
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            已選擇: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* 錯誤訊息 */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* 載入中 */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded text-center">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mr-2"></div>
          載入中...
        </div>
      )}

      {/* 控制按鈕 */}
      {pdfDoc && (
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 p-4 bg-gray-100 rounded">
          {/* 頁面控制 */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              上一頁
            </button>
            
            <span className="px-3 py-1 bg-white rounded border">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              下一頁
            </button>
          </div>

          {/* 縮放控制 */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="px-3 py-1 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600"
            >
              縮小
            </button>
            
            <span className="px-3 py-1 bg-white rounded border min-w-16 text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={zoomIn}
              disabled={scale >= 3.0}
              className="px-3 py-1 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600"
            >
              放大
            </button>
            
            <button
              onClick={resetZoom}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              重設
            </button>
          </div>
        </div>
      )}

      {/* PDF 預覽區域 */}
      <div className="border rounded-lg overflow-auto bg-gray-50 p-4">
        {!file && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📄</div>
            <p>請選擇 PDF 檔案進行預覽</p>
          </div>
        )}

        {file && (
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 shadow-md max-w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* 頁面資訊 */}
      {pdfDoc && (
        <div className="mt-4 text-center text-sm text-gray-600">
          總共 {totalPages} 頁 | 目前縮放比例: {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  );
};

export default PDFViewer;