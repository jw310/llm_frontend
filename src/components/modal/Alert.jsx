import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import SuccessIcon from '@/assets/success-icon.png';
import ErrorIcon from '@/assets/error-icon.png';

import { cn } from '@/utils/clsx.js';

function Alert({ type, message }) {
  let alertStyle;
  let icon;
  switch (type) {
    case 'success':
      alertStyle = 'bg-green-200 text-green-600';
      icon = <img src={SuccessIcon} alt='success-icon' />;
      break;
    case 'error':
      alertStyle = 'bg-red-100 text-red-500';
      icon = <img src={ErrorIcon} alt='error-icon' />;
      break;
    default:
      break;
  }

  return (
    <div
      className={cn(
        'absolute top-8 left-1/2 flex -translate-x-1/2 items-center justify-center p-[10px]',
        'gap-3 rounded text-2xl font-bold',
        alertStyle
      )}
    >
      {icon}
      {message ? message : null}
    </div>
  );
}

export default Alert;
