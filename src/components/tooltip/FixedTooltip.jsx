import { useTranslation } from "react-i18next";

import { cn } from '@/utils/clsx';
const FixedTooltip = ({ children, text }) => {
  const { t } = useTranslation();

  return (
    <div className="group flex relative">
      {children}
      {
        text ?
          <div className={cn("hidden absolute w-[210px] px-2 py-1 text-gray-800 text-base bg-gray-300",
            "md:-top-[6px] md:left-[-6px] rounded-[4px] group-hover:block transition-opacity break-words")}
          >
            {t(text)}
          </div>
        : null
      }
    </div>
  );
};

/**
 * right-1/2 -translate-x-1/2 translate-y-full mx-auto
 */

export default FixedTooltip;