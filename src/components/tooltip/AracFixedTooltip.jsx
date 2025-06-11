import { useTranslation } from 'react-i18next';

import toThousands from '@/utils/toThousands';

import { cn } from '@/utils/clsx';

const AracFixedTooltip = ({ children, text, lockAmount }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('group relative flex')}>
      {children}
      {text ? (
        <div
          className={cn(
            'absolute -top-[180px] -left-[120px] hidden w-fit min-w-[220px] px-4 py-2 text-sm text-gray-800',
            'rounded-[4px] bg-gray-300 break-words whitespace-pre-line transition-opacity group-hover:block md:-top-[100px] md:left-0'
          )}
        >
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
