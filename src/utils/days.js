import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

export function formatDate(date) {
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // getMonth() returns 0-11
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formantDateWeek(date) {
  const temp = dayjs(date).day();
  const weekName = ['日', '一', '二', '三', '四', '五', '六'];
  const week = weekName[temp];

  return dayjs(date).format('YYYY-MM-DD') + `(${week})`;
}

/**
 * Generate DateRange Array
 * @param {string} startDate - YYYY-MM-DD HH:mm:ss
 * @param {string} endDate - YYYY-MM-DD HH:mm:ss
 * @returns {Array}
 */

export const generateDateRangeArray = (startDate = null, endDate = null) => {
  const result = [];

  // catch day part
  const start = dayjs(startDate).startOf('day');
  const end = dayjs(endDate).startOf('day');

  let current = start;

  while (current.isSameOrBefore(end)) {
    const recordObject = {
      recordDate: current.format('YYYY-MM-DD'),
      isWeekend: current.day() === 0 || current.day() === 6 ? true : false,
      department: null,
      employeeId: '',
      clockInTime: '',
      clockOutTime: '',
      clockInIp: '',
      clockOutIp: '',
      clockInLocation: '',
      clockOutLocation: '',
      workHours: {},
      updatedBy: '',
      updatedAt: '',
      leaveName: '',
      leaveCode: null,
      leaveStartTime: '',
      leaveEndTime: '',
      leaveStatus: null,
      vacation: {},
      startTime: '',
      endTime: '',
    };

    result.push(recordObject);
    // date increment
    current = current.add(1, 'day');
  }

  return result;
};

/**
 * merge DataArray
 * @param {Array} dateArray - date array
 * @param {Array} leaveArray
 * @param {Array} attendanceArray
 * @returns {Array}
 */
export const mergeDataArrays = (dateArray, leaveArray, attendanceArray) => {
  return dateArray.map((dateRecord) => {
    const currentDate = dateRecord.recordDate;

    // search attendance record
    const attendanceRecord = attendanceArray?.find(
      (record) => dayjs(record.recordDate).format('YYYY-MM-DD') === currentDate
    );

    // search leave record
    const leaveRecord = leaveArray?.find((record) => {
      const leaveStart = dayjs(record.startTime).format('YYYY-MM-DD');
      const leaveEnd = dayjs(record.endTime).format('YYYY-MM-DD');
      const current = dayjs(currentDate);

      return (
        current.isSameOrAfter(leaveStart) && current.isSameOrBefore(leaveEnd)
      );
    });

    // calculate work hours
    let workHours = { hours: 0, formatted: `0h` };
    if (
      attendanceRecord &&
      attendanceRecord.clockInTime &&
      attendanceRecord.clockOutTime
    ) {
      const clockIn = dayjs(attendanceRecord.clockInTime);
      const clockOut = dayjs(attendanceRecord.clockOutTime);
      const calcHours = clockOut.diff(clockIn, 'hour', true);
      const diffTime = dayjs.duration(clockOut.diff(clockIn));
      const diffInHours = diffTime.hours();
      const diffInMinutes = diffTime.minutes();
      workHours = {
        hours: calcHours,
        formatted: `${diffInHours}h${diffInMinutes}m`,
      };
    }

    // calculate leave hours
    let vacation = {};
    if (leaveRecord && leaveRecord.startTime && leaveRecord.endTime) {
      const leaveStart = dayjs(leaveRecord.startTime);
      const leaveEnd = dayjs(leaveRecord.endTime);
      const calcHours = leaveEnd.diff(leaveStart, 'hour', true);
      const diffTime = dayjs.duration(leaveEnd.diff(leaveStart));
      const diffInHours = diffTime.hours();
      const diffInMinutes = diffTime.minutes();
      vacation = {
        hours: calcHours,
        formatted: `${diffInHours}h${diffInMinutes}m`,
      };
    }

    // calculate scheduled hours
    let scheduledHours = { hours: 9, formatted: `9h` };
    if (leaveRecord && leaveRecord.startTime && leaveRecord.endTime) {
      const leaveStart = dayjs(leaveRecord.startTime);
      const leaveEnd = dayjs(leaveRecord.endTime);
      const calcHours = leaveEnd.diff(leaveStart, 'hour', true);
      const diffTime = dayjs.duration(leaveEnd.diff(leaveStart));
      const diffInHours = diffTime.hours();
      const diffInMinutes = diffTime.minutes();
      scheduledHours = {
        hours: calcHours,
        formatted: `${9 - diffInHours}h${diffInMinutes}m`,
      };
    }

    // merge data
    return {
      recordDate: attendanceRecord?.recordDate || currentDate,
      isWeekend: dateRecord.isWeekend,
      department: attendanceRecord?.department || '',
      employeeId: attendanceRecord?.employeeId || '',
      clockInTime: attendanceRecord?.clockInTime
        ? attendanceRecord?.clockInTime.substr(11, 8)
        : '',
      clockOutTime: attendanceRecord?.clockOutTime
        ? attendanceRecord?.clockOutTime.substr(11, 8)
        : '',
      clockInIp: attendanceRecord?.clockInIp || '',
      clockOutIp: attendanceRecord?.clockOutIp || '',
      clockInLocation: attendanceRecord?.clockInLocation || '',
      clockOutLocation: attendanceRecord?.clockOutLocation || '',
      workHours: workHours,
      updatedBy: attendanceRecord?.updatedBy || '',
      updatedAt: attendanceRecord?.updatedAt || '',
      leaveName: leaveRecord?.leaveName || '',
      scheduledHours: scheduledHours,
      leaveCode: leaveRecord?.leaveCode || '',
      leaveStartTime: leaveRecord?.startTime
        ? leaveRecord?.startTime.substr(11, 5)
        : '',
      leaveEndTime: leaveRecord?.endTime
        ? leaveRecord?.endTime.substr(11, 5)
        : '',
      leaveStatus: leaveRecord?.status || '',
      vacation: vacation,
      startTime: attendanceRecord?.clockInTime || '',
      endTime: attendanceRecord?.clockOutTime || '',
    };
  });
};
