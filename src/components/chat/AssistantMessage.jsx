import { useRef, useEffect } from 'react';
import { marked } from 'marked';

import { cn } from '@/utils/clsx';

function AssistantMessage({ content }) {
  const contentRef = useRef(null);
  const contentHtml = marked(content, {
    breaks: true,
    gfm: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    // highlight: function (code) {
    //   return require('highlight.js').highlightAuto(code).value;
    // },
  });

  useEffect(() => {
    contentRef.current.innerHTML = contentHtml;
  }, [contentRef]);

  return (
    <div className={cn('flex flex-row items-center justify-between')}>
      <div
        ref={contentRef}
        className={cn(
          'my-0.25 max-w-4/5 self-start bg-blue-500 px-2.5 py-1.5 text-gray-100',
          'rounded-md border break-words'
        )}
      >
        {/* {content} */}
      </div>
    </div>
  );
}

export default AssistantMessage;
