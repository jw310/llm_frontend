import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar({ eventsData }) {
  return (
    <>
      <div className='w-full rounded border-2 border-slate-800 bg-white p-10'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          // headerToolbar={{
          //   left: 'prev,next',
          //   center: 'title',
          //   right: 'dayGridMonth,dayGridWeek,dayGridDay'
          // }}
          weekends={true}
          events={eventsData}
          eventContent={(eventInfo) => {
            return (
              <div className='fc-title event-title rounded bg-blue-500 px-4 text-white'>
                {eventInfo.timeText}&nbsp;
                {eventInfo.event.title}
              </div>
            );
          }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            meridiem: false,
            separator: ' - ',
          }}
          displayEventEnd={true}
        />
      </div>
    </>
  );
}

export default Calendar;
