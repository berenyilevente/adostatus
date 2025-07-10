'use client';

import {
  DateSelectArg,
  EventChangeArg,
  EventClickArg,
} from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useCalendar } from './use-calendar';
import {
  Button,
  DayHeader,
  DayRender,
  EventItem,
  FormSelect,
  FormWrapper,
  FullCalendarNav,
} from '@/components';
import { CalendarEvent } from './calendar.helper';
import { AppointmentDialog } from './components/AppointmentDialog';

export function CalendarPage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [viewedDate, setViewedDate] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(new Date());
  const [selectedEnd, setSelectedEnd] = useState(new Date());
  const [selectedOldEvent, setSelectedOldEvent] = useState<
    CalendarEvent | undefined
  >();
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent | undefined
  >();
  const [isDrag, setIsDrag] = useState(false);
  const {
    appointments,
    filterForm,
    businessOptions,
    setIsAppointmentDialogOpen,
  } = useCalendar();

  const events = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    description: appointment.description,
    start: appointment.start,
    end: appointment.end,
    backgroundColor: '#AEC6E4',
  }));

  const handleEventClick = (info: EventClickArg) => {
    const event: CalendarEvent = {
      id: info.event.id,
      title: info.event.title,
      description: info.event.extendedProps.description,
      backgroundColor: info.event.backgroundColor,
      start: info.event.start!,
      end: info.event.end!,
    };

    setIsDrag(false);
    setSelectedOldEvent(event);
    setSelectedEvent(event);
  };

  const handleEventChange = (info: EventChangeArg) => {
    const event: CalendarEvent = {
      id: info.event.id,
      title: info.event.title,
      description: info.event.extendedProps.description,
      backgroundColor: info.event.backgroundColor,
      start: info.event.start!,
      end: info.event.end!,
    };

    const oldEvent: CalendarEvent = {
      id: info.oldEvent.id,
      title: info.oldEvent.title,
      description: info.oldEvent.extendedProps.description,
      backgroundColor: info.oldEvent.backgroundColor,
      start: info.oldEvent.start!,
      end: info.oldEvent.end!,
    };

    setIsDrag(true);
    setSelectedOldEvent(oldEvent);
    setSelectedEvent(event);
  };

  const handleDateSelect = (info: DateSelectArg) => {
    setSelectedStart(info.start);
    setSelectedEnd(info.end);
  };

  return (
    <div className="space-y-5">
      <FullCalendarNav
        calendarRef={calendarRef}
        start={selectedStart}
        end={selectedEnd}
        viewedDate={viewedDate}
        filters={
          <FormWrapper form={filterForm} className="text-sm font-semibold">
            <FormSelect
              name="business"
              control={filterForm.control}
              options={businessOptions}
              placeholder="Select a business"
            />
          </FormWrapper>
        }
        actions={
          <>
            <Button
              endIcon="plus"
              onClick={() => setIsAppointmentDialogOpen(true)}
              disabled={!filterForm.watch('business')}
            >
              Add Event
            </Button>
            <AppointmentDialog />
          </>
        }
      />

      <Card className="p-3">
        <FullCalendar
          ref={calendarRef}
          timeZone="local"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="timeGridWeek"
          headerToolbar={false}
          // slotMinTime={calendarEarliestTime}
          // slotMaxTime={calendarLatestTime}
          allDaySlot={false}
          firstDay={1}
          height={'32vh'}
          displayEventEnd={true}
          windowResizeDelay={0}
          events={events}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }}
          eventBorderColor={'black'}
          contentHeight={'auto'}
          expandRows={true}
          dayCellContent={(dayInfo) => <DayRender info={dayInfo} />}
          eventContent={(eventInfo) => <EventItem info={eventInfo} />}
          dayHeaderContent={(headerInfo) => <DayHeader info={headerInfo} />}
          eventClick={(eventInfo) => handleEventClick(eventInfo)}
          eventChange={(eventInfo) => handleEventChange(eventInfo)}
          select={handleDateSelect}
          datesSet={(dates) => setViewedDate(dates.view.currentStart)}
          nowIndicator
          editable
          selectable
        />
      </Card>
    </div>
  );
}
