import { useState } from "react";

import PdfViewer from "@/components/PdfViewer.jsx";

import { cn } from "@/utils/clsx.js";

const PdfPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  return (
    <div className={cn("min-h-screen bg-gray-50 p-4")}>
      <div className={cn("max-w-6xl mx-auto")}>
        <div className={cn("mb-6")}>
          <h1 className={cn("text-3xl font-bold text-gray-900 mb-4")}>PDF Viewer</h1>
          <p className={cn("text-gray-600 mb-4")}>PDF viewer with page-level rendering using PDF.js</p>

          <div className={cn("flex flex-col sm:flex-row gap-4 mb-4")}>
            <input
              type="url"
              placeholder="Input PDF URL..."
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className={cn("flex-1 px-4 py-2 border border-gray-300 rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            />
            <button
              onClick={() => setPdfUrl('')}
              className={cn("px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors")}
            >
              Clear
            </button>
          </div>

          <div className={cn("flex flex-wrap gap-2")}>
            <button
              onClick={() => setPdfUrl('http://localhost:5173/test.pdf')}
              className={cn("px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors")}
            >
              PDF Preview Example
            </button>
          </div>
        </div>

        <PdfViewer url={pdfUrl}/>
      </div>
    </div>
  );
};

export default PdfPage;