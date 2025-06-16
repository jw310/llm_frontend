import { useState, useRef, useEffect } from 'react';

import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { setHours, setMinutes } from 'date-fns';
import dayjs from 'dayjs';
import { cn } from '@/utils/clsx';

// 今天的時間：取到小時整點
// let availableHours = [];

// //禁止選取的時間：24小時中小於9點或大於18點或是12點
// const disabledTime = () => {
//   return {
//     disabledHours: () => {
//       for (let i = 0; i < 24; i++) {
//         if (i < 9 || i > 18 || i === 12) {
//           availableHours.push(i);
//         }
//       }
//       return availableHours;
//     },
//   };
// };
// //用戶不可選取的日期
// const disabledDate = (current, holidaysArr, validStart, validEnd) => {
//   const currentDay = dayjs(current).format('YYYYMMDD');
//   const isDisabled = holidaysArr.some((item) => item.date === currentDay);

//   return (
//     current.isBefore(validStart, 'day') ||
//     current.isAfter(validEnd, 'day') ||
//     isDisabled
//   );
// };

const DataRangePicker = ({
  onChange,
  value = { from: undefined, to: undefined },
  error,
}) => {
  const [timeFrom, setTimeFrom] = useState('12:00');
  const [timeTo, setTimeTo] = useState('12:00');
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

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

  const displayFrom = value?.from
    ? dayjs(value.from).format('YYYY-MM-DD HH:mm')
    : 'Start date';
  const displayTo = value?.to
    ? dayjs(value.to).format('YYYY-MM-DD HH:mm')
    : 'End date';

  // 點擊外部收起 dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative ml-5 inline-block w-fit')} ref={pickerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between rounded-md border px-4 py-3 text-sm shadow-sm transition',
          error ? 'border-red-500' : 'border-slate-300',
          'bg-white hover:border-slate-400'
        )}
      >
        <span
          className={cn(
            'flex flex-1 items-center justify-start gap-2 text-gray-500'
          )}
        >
          <span>{displayFrom}</span>
          <span className={cn('mx-1')}>→</span>
          <span>{displayTo}</span>
        </span>
        <CalendarIcon className={cn('ml-2 h-4 text-gray-400')} />
      </button>

      {open && (
        <div
          className={cn(
            'absolute z-10 mt-1 w-fit rounded-md bg-white p-1 shadow-xl'
          )}
        >
          <div className={cn('space-y-2')}>
            <div className={cn('flex flex-col justify-center gap-2')}>
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
                disabled={{ dayOfWeek: [0, 6] }}
                className={cn('')}
                classNames={
                  {
                    // outside: 'bg-gray-300',
                    // outsideDay: 'bg-white',
                    // selected: 'bg-blue-500',
                    // today: 'text-blue-500',
                    // day: 'bg-gray-300',
                    // root: `${defaultClassNames.root} shadow-lg p-5`,
                    // chevron: `${defaultClassNames.chevron} fill-amber-500`,
                  }
                }
              />
              <div className={cn('flex gap-4')}>
                <div>
                  <label className={cn('text-sm')}>From：</label>
                  <input
                    type='time'
                    className={cn('rounded border p-1')}
                    value={timeFrom}
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </div>
                <div>
                  <label className={cn('text-sm')}>To：</label>
                  <input
                    type='time'
                    className={cn('rounded border p-1')}
                    value={timeTo}
                    onChange={(e) => setTimeTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataRangePicker;
