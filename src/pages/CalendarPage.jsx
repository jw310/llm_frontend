// import { useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getDashboardAppliesApi } from '@/api/api';

import Calendar from '@/components/Calendar';

// import { AuthContext } from '@/context/auth';

function CalendarPage() {
  // const { logout } = useContext(AuthContext);

  // const { data } = useQuery({
  //   queryKey: ['dashboards'],
  //   queryFn: async () => {
  //     try {
  //       const data = await getDashboardAppliesApi();

  //       return data;
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //       toast.error('有東西出錯了！請重新登入！', {
  //         position: 'top-center',
  //         autoClose: 1000,
  //       });

  //       setTimeout(() => {
  //         logout();
  //       }, 2000);

  //       return {};
  //     }
  //   },
  //   refetchOnWindowFocus: false,
  // });

  const eventsData = {}

  // const eventsData = data?.data?.map((item) => {
  //   return {
  //     title: `${item.employeeName} ${item.leaveName}`,
  //     start: item.startTime,
  //     end: item.endTime,
  //   };
  // });

  return (
    <div>
      <div className='flex h-fit min-h-main w-full justify-center px-20 py-10'>
          <Calendar eventsData={eventsData}  />
      </div>
    </div>
  );
}

export default CalendarPage;