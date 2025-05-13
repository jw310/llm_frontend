import SuccessIcon from '@/assets/success-icon.png';
import ErrorIcon from '@/assets/error-icon.png';

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
      className={`${alertStyle} absolute left-1/2 top-8 flex -translate-x-1/2 items-center justify-center gap-3 rounded p-[10px] text-2xl font-bold`}
    >
      {icon}
      {message}
    </div>
  );
}

export default Alert;
