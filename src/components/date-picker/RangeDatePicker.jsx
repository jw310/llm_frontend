import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { fetchHolidays } from '@/plugins/holiday.js';

const { RangePicker } = DatePicker;

//今天的時間：取到小時整點
let availableHours = [];

//禁止選取的時間：24小時中小於9點或大於18點或是12點
const disabledTime = () => {
  return {
    disabledHours: () => {
      for (let i = 0; i < 24; i++) {
        if (i < 9 || i > 18 || i === 12) {
          availableHours.push(i);
        }
      }
      return availableHours;
    },
  };
};
//用戶不可選取的日期
const disabledDate = (current, holidaysArr, validStart, validEnd) => {
  const currentDay = dayjs(current).format('YYYYMMDD');
  const isDisabled = holidaysArr.some((item) => item.date === currentDay);

  return (
    current.isBefore(validStart, 'day') ||
    current.isAfter(validEnd, 'day') ||
    isDisabled
  );
};

function RangeDatePicker({
  error,
  onChange,
  onDurationChange,
  showTime,
  validStart,
  validEnd,
}) {
  //今年所有假期的陣列
  const [holidaysArr, setHolidaysArr] = useState([]);

  const onOk = (value) => {
    //如果沒有選擇日期，就不做任何事情
    if (!value || !value[1]) {
      onDurationChange({ hoursCount: 0 });
      return;
    }
    //value本身就是dayjs格式
    const [startDate, endDate] = value;

    //取得選取區間的日期：從startDate開始，一直+1天記錄到和endDate同一天為止
    const datesInRange = [];
    let currentDate = startDate;
    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, 'day')
    ) {
      datesInRange.push(currentDate.format('YYYYMMDD'));
      currentDate = currentDate.add(1, 'day');
    }

    //找出選取區間的日期內的假日
    const includedHolidays = datesInRange.filter((date) =>
      holidaysArr.some((item) => date === item.date)
    );
    //排除假日
    const excludedHolidays = datesInRange.filter(
      (date) => !holidaysArr.some((item) => date === item.date)
    );

    //轉換成timeStamp格式計算小時差
    const startTimestamp = startDate.valueOf();
    const endTimestamp = endDate.valueOf();
    const diffTime = endTimestamp - startTimestamp;
    const totalDiffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    const workHoursPerDay = 9; // 每天的工作時數
    const nonWorkHoursPerDay = 15; // 每天的非工作時數
    const lunchBreakHours = 1; // 中午休息時間

    //扣掉假日和非公時間
    const diffWorkingHours =
      totalDiffHours -
      includedHolidays.length * 24 -
      (excludedHolidays.length - 1) * nonWorkHoursPerDay;

    //工作時數除以9小時，取整數和餘數，分別為總天數和剩餘小時數
    const leaveDays = Math.floor(diffWorkingHours / workHoursPerDay);
    let leaveHours = diffWorkingHours % workHoursPerDay;

    //創建中午時間;
    const startNoon = startDate.hour(12).minute(0).second(0);
    const endNoon = endDate.hour(12).minute(0).second(0);

    //如果剩餘小時數大於0，且開始日期在中午，且結束日期在午後，就減去中午休息時間
    if (
      leaveHours > 0 &&
      startDate.isBefore(startNoon) &&
      endDate.isAfter(endNoon)
    ) {
      leaveHours -= lunchBreakHours;
    }

    const totalLeaveHours = leaveDays * 8 + leaveHours;

    onDurationChange({ hoursCount: totalLeaveHours });
  };

  //先獲取假期陣列;
  useEffect(() => {
    const fetchHolidayAsync = async () => {
      const res = await fetchHolidays();
      const holidays = res.filter((item) => item.isHoliday === true);
      setHolidaysArr(holidays);
    };
    fetchHolidayAsync();
  }, []);

  return (
    <RangePicker
      className={`custom-range-picker h-fit w-[600px] rounded-md border px-4 py-2 ${error ? 'border-red-500' : 'border-slate-300'}`}
      placeholder={['開始時間', '結束時間']}
      disabledDate={(current) =>
        disabledDate(current, holidaysArr, validStart, validEnd)
      }
      disabledTime={disabledTime}
      showTime={showTime ? { format: 'HH:00' } : false}
      format='YYYY-MM-DD HH:mm'
      onChange={(value, dateString) => {
        if (!value) {
          onDurationChange({ hoursCount: 0 });
        } else {
          onOk(value);
          onChange(dateString);
        }
      }}
      needConfirm={false}
      // onOk={onOk}
    />
  );
}

export default RangeDatePicker;
