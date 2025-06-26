import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import { cn } from '@/utils/clsx';

const SingleDatePicker = ({
  onChange,
  value,
  error,
  placeholderText,
  customStyle,
}) => {
  // 將字串轉換為 Date 物件
  const dateValue = value ? new Date(value) : null;

  const handleChange = (date) => {
    if (!date) {
      onChange(null);
      return;
    }

    // 將 Date 物件轉換為 YYYY-MM-DD 格式的字串
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const dateString = `${year}-${month}-${day}`;

    const dataString = dayjs(date).format('YYYY-MM-DD');

    onChange(dataString);
  };

  return (
    <div className={cn('relative')}>
      <DatePicker
        selected={dateValue}
        onChange={handleChange}
        placeholderText={placeholderText}
        dateFormat='yyyy-MM-dd'
        className={cn(
          'h-12 w-full rounded-md border bg-white px-4 py-2 text-base',
          'outline-none focus:outline-none',
          error ? 'border-red-500' : 'border-slate-300',
          customStyle
        )}
        // 自定義樣式
        calendarClassName='shadow-lg'
        showPopperArrow={false}
        // 可選：限制日期範圍
        // maxDate={new Date()}
        // minDate={new Date('2000-01-01')}
      />
      <div className={cn('absolute top-4 right-3 h-6 text-gray-400')}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
        >
          <path
            d='M13.8 2.59998H4.2C2.43269 2.59998 1 4.03266 1 5.79998V13.8C1 15.5673 2.43269 17 4.2 17H13.8C15.5673 17 17 15.5673 17 13.8V5.79998C17 4.03266 15.5673 2.59998 13.8 2.59998Z'
            stroke='black'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.8 1V4.2M12.2 1V4.2M1 7.4H17'
            stroke='black'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
};

export default SingleDatePicker;
