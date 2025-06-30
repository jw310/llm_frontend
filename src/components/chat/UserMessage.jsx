import { marked } from 'marked';

import { cn } from '@/utils/clsx';

function UserMessage({ content }) {
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

  return (
    <div
      className={cn(
        'my-0.25 max-w-4/5 self-end rounded-md border bg-slate-200 px-2.5 py-1 break-words text-black'
      )}
      // 替代 JS 的 innerHTML，可以將 HTML 塞入 DOM 元素中
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    >
      {/* {content} */}
    </div>
  );
}

export default UserMessage;
