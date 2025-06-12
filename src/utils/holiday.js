const getCurrentYear = new Date().getFullYear();

//讀取行事曆資料
export const fetchHolidays = async () => {
  const response = await fetch(
    `https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${getCurrentYear}.json`
  );

  const data = await response.json();

  return data;
};
