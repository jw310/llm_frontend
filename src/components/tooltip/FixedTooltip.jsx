import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/clsx';
const FixedTooltip = ({ children, text }) => {
  const { t } = useTranslation();

  return (
    <div className='group relative flex'>
      {children}
      {text ? (
        <div
          className={cn(
            'absolute hidden w-[210px] bg-gray-300 px-2 py-1 text-base text-gray-800',
            'rounded-[4px] break-words transition-opacity group-hover:block md:-top-[6px] md:left-[-6px]'
          )}
        >
          {t(text)}
        </div>
      ) : null}
    </div>
  );
};

/**
 * right-1/2 -translate-x-1/2 translate-y-full mx-auto
 */

export default FixedTooltip;
