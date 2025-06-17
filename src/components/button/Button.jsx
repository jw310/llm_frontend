import { cn } from '@/utils/clsx.js';

function Button({ icon, text, onClick, bgColor, width, type }) {
  return (
    <button
      type={type}
      className={cn(
        'flex h-fit w-fit items-center justify-center gap-2 rounded-md p-3 text-lg font-bold',
        'hover:bg-grey-100 hover:text-grey-800',
        width ? width : 'w-fit',
        bgColor
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
