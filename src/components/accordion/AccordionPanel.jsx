import { useRef } from 'react';

import { cn } from '@/utils/clsx';

const AccordionPanel = ({ panel, isExpand }) => {
  const panelRef = useRef(null);
  const scrollHeight = panelRef.current?.scrollHeight;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-b-[6px] bg-[#323F52] pr-[40px] pl-10 text-[#EFF2F5] transition-all',
        isExpand ? `max-h-[${scrollHeight}]` : 'h-0',
        isExpand && 'pt-4 pb-10'
      )}
      ref={panelRef}
    >
      {panel}
    </div>
  );
};

export default AccordionPanel;
