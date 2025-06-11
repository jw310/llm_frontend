import ArrowOffIcon from '@/assets/faq_arrow_off_icon.svg';

import { cn } from '@/utils/clsx';

const AccordionHeader = ({ header, isExpand, onClick }) => {
  return (
    <div
      className={cn(
        'flex h-[112px] cursor-pointer items-center justify-between bg-[#323F52] p-5 text-[18px] text-[#EFF2F5] md:p-10',
        isExpand ? 'rounded-t-[6px]' : 'rounded-[6px]'
      )}
      onClick={() => onClick('header')}
      //   style={{ minHeight: isExpand ? "500px" : "auto" }}
    >
      {header}
      <div
        className={cn(
          'inline-flex items-center transition-all',
          isExpand ? 'rotate-180' : 'rotate-0'
        )}
      >
        <img src={ArrowOffIcon} alt='svg' width={32} height={32} />
      </div>
    </div>
  );
};

export default AccordionHeader;
