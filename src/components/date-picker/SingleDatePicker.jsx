import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function SingleDatePicker({ onChange, value, error }) {
  return (
    <DatePicker
      onChange={(value, dateString) => {
        if (!value) return onChange(null);
        onChange(dateString);
      }}
      defaultValue={value ? dayjs(value, 'YYYY-MM-DD') : null}
      placeholder='請選擇日期'
      size='large'
      className={`w-full rounded-md border px-4 py-2 ${error ? 'border-red-500' : 'border-slate-300'}`}
    />
  );
}

export default SingleDatePicker;
