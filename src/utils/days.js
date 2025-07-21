import dayjs from 'dayjs';

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
