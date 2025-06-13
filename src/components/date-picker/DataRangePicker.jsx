import { useState, useEffect } from 'react';

import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { setHours, setMinutes } from 'date-fns';
import dayjs from 'dayjs';
import { cn } from '@/utils/clsx';

const DataRangePicker = ({
  onChange,
  value = { from: undefined, to: undefined },
  error,
}) => {
  const [timeFrom, setTimeFrom] = useState('12:00');
  const [timeTo, setTimeTo] = useState('12:00');

  const defaultClassNames = getDefaultClassNames();

  // 當改變時間 input 時，更新日期時間
  useEffect(() => {
    if (!value.from) return;
    const [h, m] = timeFrom.split(':').map(Number);
    onChange({
      from: dayjs(setHours(setMinutes(value.from, m), h)).format(
        'YYYY-MM-DD HH:mm'
      ),
      to: dayjs(value.to).format('YYYY-MM-DD HH:mm'),
    });
  }, [timeFrom]);

  useEffect(() => {
    if (!value.to) return;
    const [h, m] = timeTo.split(':').map(Number);
    onChange({
      from: dayjs(value.from).format('YYYY-MM-DD HH:mm'),
      to: dayjs(setHours(setMinutes(value.to, m), h)).format(
        'YYYY-MM-DD HH:mm'
      ),
    });
  }, [timeTo]);

  return (
    <div className='m-1 space-y-2'>
      <div className='flex flex-col justify-center gap-2'>
        <DayPicker
          mode='range'
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
          // captionLayout='dropdown'
          navLayout='around'
          showOutsideDays
          // showWeekNumber
          // fixedWeeks
          className={cn(
            'w-fit rounded-md border',
            error ? 'border-red-500' : 'border-slate-300'
          )}
          classNames={{
            outside: 'bg-gray-300',
            // outsideDay: 'bg-white',
            selected: 'bg-blue-500',
            today: 'text-blue-500',
            // day: 'bg-gray-300',
            root: `${defaultClassNames.root} shadow-lg p-5`,
            chevron: `${defaultClassNames.chevron} fill-amber-500`,
          }}
        />
        <div className='flex gap-4'>
          <div>
            <label className='text-sm'>From：</label>
            <input
              type='time'
              className='rounded border p-1'
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
            />
          </div>
          <div>
            <label className='text-sm'>To：</label>
            <input
              type='time'
              className='rounded border p-1'
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRangePicker;
