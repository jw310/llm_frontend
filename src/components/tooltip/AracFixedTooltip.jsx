import { useTranslation } from 'react-i18next';

import toThousands from '@/utils/toThousands';

import { cn } from '@/utils/clsx';

const AracFixedTooltip = ({ children, text, lockAmount }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('group relative flex')}>
      {children}
      {text ? (
        <div className={cn("absolute -left-[120px] -top-[180px] hidden w-fit min-w-[220px] px-4 py-2 text-sm text-gray-800",
            "md:-top-[100px] md:left-0 whitespace-pre-line break-words rounded-[4px] bg-gray-300 transition-opacity group-hover:block")}>
          {t(text)} <span>{toThousands(lockAmount)}</span>
        </div>
      ) : null}
    </div>
  );
};
/**
 * right-1/2 -translate-x-1/2 translate-y-full mx-auto
 */

export default AracFixedTooltip;
