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
import { useBusinessHours } from '../business-hours/use-business-hours';
import { FormSubmission } from '@/generated/prisma';

type FormSubmissionValues = {
  value: string;
  type: string;
  name: string;
  label: string;
};

const getEvents = (formSubmissions: FormSubmission[]) => {
  const submissionData: FormSubmissionValues[] = formSubmissions.flatMap(
    (submission) => JSON.parse(submission.submissionData as string)
  );

  console.log(submissionData.map((submission) => submission));
};

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
    formSubmissions,
  } = useCalendar();

  const { openBusinessHoursDialog } = useBusinessHours();

  type Event = {
    id: string;
    title: string;
    description: string | null;
    start: Date;
    end: Date;
    backgroundColor: string;
  };

  getEvents(formSubmissions);

  const events: Event[] = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    description: appointment.description,
    start: appointment.start,
    end: appointment.end,
    backgroundColor: appointment.backgroundColor ?? '#AEC6E4',
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
              variant="outline"
              endIcon="clock"
              onClick={openBusinessHoursDialog}
            >
              Set business hours
            </Button>
            <Button
              endIcon="plus"
              onClick={() => setIsAppointmentDialogOpen(true)}
              disabled={!filterForm.watch('business')}
            >
              Add Appointment
            </Button>
            <AppointmentDialog />
          </>
        }
      />

      <Card className="p-3 h-[calc(100vh-20rem)] overflow-auto">
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
          slotMinTime="06:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          firstDay={1}
          height={''}
          displayEventEnd={true}
          windowResizeDelay={0}
          events={events}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
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
