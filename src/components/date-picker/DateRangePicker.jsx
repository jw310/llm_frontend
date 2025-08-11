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

// 24 hours
const TIME_OPTIONS = Array.from(
  { length: 24 },
  (_, i) => String(i).padStart(2, '0') + ':00'
);

// 30 minutes
// const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) =>
//   dayjs()
//     .startOf('day')
//     .add(i * 30, 'minute')
//     .format('HH:mm')
// );

const DateRangePicker = ({
  onChange,
  value = { from: undefined, to: undefined },
  error,
  customStyle,
  placeholderText,
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
    <div className={cn('relative inline-block w-fit')} ref={pickerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-md border px-4 py-3 text-sm shadow-sm transition',
          error ? 'border-red-500' : 'border-slate-300',
          'bg-white hover:border-slate-400',
          customStyle
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
        {/* <CalendarIcon className={cn('ml-2 h-4 text-gray-400')} /> */}
        <div className={cn('ml-3 h-4 text-gray-300')}>
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
      </button>

      {open && (
        <div
          className={cn(
            'absolute z-10 mt-1 w-fit rounded-md bg-white p-1 shadow-xl'
          )}
        >
          <div className={cn('space-y-2')}>
            <div className={cn('flex justify-center gap-2')}>
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
                classNames={{
                  // outside: 'bg-gray-300',
                  // outsideDay: 'bg-white',
                  selected: `bg-amber-500 border-amber-500 text-white`,
                  today: 'text-green-500 border-1 border-green-500',
                  // day: 'bg-gray-300',
                  // root: `${defaultClassNames.root} shadow-lg p-5`,
                  // chevron: `${defaultClassNames.chevron} fill-amber-500`,
                }}
              />
              <div className={cn('flex gap-4')}>
                {/* <div>
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
                </div> */}
                {/* 時間欄 From */}
                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    From：
                  </label>
                  <div className='mt-1 max-h-[260px] w-[80px] overflow-y-auto rounded-md border'>
                    {TIME_OPTIONS.map((time) => (
                      <div
                        key={time}
                        onClick={() => setTimeFrom(time)}
                        className={cn(
                          'cursor-pointer px-3 py-1 text-sm hover:bg-blue-100',
                          timeFrom === time &&
                            'bg-blue-500 font-semibold text-white'
                        )}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 時間欄 To */}
                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    To：
                  </label>
                  <div className='mt-1 max-h-[260px] w-[80px] overflow-y-auto rounded-md border'>
                    {TIME_OPTIONS.map((time) => (
                      <div
                        key={time}
                        onClick={() => setTimeTo(time)}
                        className={cn(
                          'cursor-pointer px-3 py-1 text-sm hover:bg-blue-100',
                          timeTo === time &&
                            'bg-blue-500 font-semibold text-white'
                        )}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
