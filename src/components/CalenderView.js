// components/CalendarView.js
import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useInterviewStore from '../store/useScheduleStore';

// Styled Components
const CalendarContainer = styled.div`
  width: 95%;
  height: 700px;
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .rbc-calendar {
    height: 100%;
  }

  .rbc-event {
    background-color: #3b82f6;
    border-radius: 4px;
  }

  .rbc-event-label {
    display: none;
  }

  .rbc-toolbar button {
    color: #1a1a1a;
    border: 1px solid #e5e7eb;
    &:hover {
      background-color: #f3f4f6;
    }
    &:active {
      background-color: #e5e7eb;
    }
  }

  .rbc-active {
    background-color: #3b82f6 !important;
    color: white !important;
  }

  .rbc-today {
    background-color: #eff6ff;
  }

  .rbc-event.technical {
    background-color: #3b82f6;
  }

  .rbc-event.hr {
    background-color: #10b981;
  }

  .rbc-event.behavioral {
    background-color: #8b5cf6;
  }
`;

const EventWrapper = styled.div`
  padding: 2px 4px;
`;

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Custom Event Component
const EventComponent = ({ event, selectedSlots }) => {
  const isSelected = selectedSlots.includes(event.start);
  return (
    <EventWrapper style={{ backgroundColor: isSelected ? 'green' : 'red' }}>
      <strong>{event.timeSlot}</strong>
      <br />
      <small>{event.interviewer}</small> 
      {isSelected && <span> (Unavailable)</span>}
    </EventWrapper>
  );
};

function CalendarView() {
  const { interviews } = useInterviewStore();
  console.log(interviews)
  const selectedSlots = useMemo(() => interviews.map(interview => new Date(`${interview.date}T${interview.timeSlot}`)), [interviews]);

  // Convert interviews to calendar events
  const events = useMemo(() => {
    return interviews
      .filter(interview => !selectedSlots.includes(interview.timeSlot))
      .map(interview => ({
        id: interview.id,
        title: `${interview.candidateName} - ${interview.type}`,
        start: new Date(`${interview.date}T${interview.timeSlot}`),
        end: new Date(`${interview.date}T${interview.timeSlot}`),
        candidateName: interview.candidateName,
        interviewerName: interview.interviewerName,
        type: interview.type?.toLowerCase(),
        resourceId: interview.interviewerName,
      }));
  }, [interviews, selectedSlots]);

  const eventPropGetter = (event) => ({
    className: event.type?.toLowerCase(),
    style: {
      border: 'none',
    }
  });

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable={false}
        eventPropGetter={eventPropGetter}
        components={{
          event: (eventProps) => <EventComponent {...eventProps} selectedSlots={selectedSlots} />
        }}
        defaultView="week"
        views={['month', 'week', 'day']}
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
      />
    </CalendarContainer>
  );
};

export default CalendarView;