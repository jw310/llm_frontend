import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const SingleDatePicker = ({ onChange, value, error }) => {
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
    <DatePicker
      selected={dateValue}
      onChange={handleChange}
      placeholderText='請選擇日期'
      dateFormat='yyyy-MM-dd'
      className={`w-full rounded-md border px-4 py-2 text-lg ${
        error ? 'border-red-500' : 'border-slate-300'
      }`}
      // 自定義樣式
      calendarClassName='shadow-lg'
      showPopperArrow={false}
      // 可選：限制日期範圍
      // maxDate={new Date()}
      // minDate={new Date('2000-01-01')}
    />
  );
};

export default SingleDatePicker;
