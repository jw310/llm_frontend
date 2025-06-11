import { useState } from 'react';

import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';

import { cn } from '@/utils/clsx';

const Accordion = (props) => {
  const [isExpandHeader, setIsExpandHeader] = useState(false);
  const [isExpandPanel, setIsExpandPanel] = useState(false);

  const onClickHandler = () => {
    setIsExpandHeader((prev) => !prev);
    setIsExpandPanel((prev) => !prev);
  };

  return (
    <div className={cn('mx-auto my-4 w-full rounded-[6px]')}>
      <AccordionHeader
        isExpand={isExpandHeader}
        onClick={onClickHandler}
        header={props.header}
      />
      <AccordionPanel
        isExpand={isExpandPanel}
        onClick={onClickHandler}
        panel={props.panel}
      />
    </div>
  );
};

export default Accordion;
