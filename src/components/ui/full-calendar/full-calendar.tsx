'use client';

import './calendar.css';
import {
  CalendarOptions,
  DateSelectArg,
  DayCellContentArg,
  DayHeaderContentArg,
  EventChangeArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarNav } from './full-calendar-nav';

import { useRef } from 'react';
import { CustomRendering } from '@fullcalendar/core/internal';
import dayjs from 'dayjs';

const plugins = [
  dayGridPlugin,
  timeGridPlugin,
  multiMonthPlugin,
  interactionPlugin,
  listPlugin,
];

type EventItemProps = {
  info: EventContentArg;
};

const EventItem = ({ info }: EventItemProps) => {
  const { event } = info;
  const [left, right] = info.timeText.split(' - ');

  return (
    <div className="overflow-hidden w-full">
      {info.view.type == 'dayGridMonth' ? (
        <div
          style={{ backgroundColor: info.backgroundColor }}
          className={`flex flex-col rounded-md w-full px-2 py-1 line-clamp-1 text-[0.5rem] sm:text-[0.6rem] md:text-xs`}
        >
          <p className="font-semibold text-gray-950 line-clamp-1 w-11/12">
            {event.title}
          </p>

          <p className="text-gray-800">{left}</p>
          <p className="text-gray-800">{right}</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-0 text-[0.5rem] sm:text-[0.6rem] md:text-xs">
          <p className="font-semibold w-full text-gray-950 line-clamp-1">
            {event.title}
          </p>
          <p className="text-gray-800 line-clamp-1">{`${left} - ${right}`}</p>
        </div>
      )}
    </div>
  );
};

type DayHeaderProps = {
  info: DayHeaderContentArg;
};

const DayHeader = ({ info }: DayHeaderProps) => {
  const [weekday] = info.text.split(' ');

  return (
    <div className="flex items-center h-full overflow-hidden">
      {info.view.type == 'timeGridDay' ? (
        <div className="flex flex-col rounded-sm">
          <p>
            {info.date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      ) : info.view.type == 'timeGridWeek' ? (
        <div className="flex flex-col space-y-0.5 rounded-sm items-center w-full text-xs sm:text-sm md:text-md">
          <p className="flex font-semibold">{weekday}</p>
          {info.isToday ? (
            <div className="flex bg-black dark:bg-white h-6 w-6 rounded-full items-center justify-center text-xs sm:text-sm md:text-md">
              <p className="font-light dark:text-black text-white">
                {info.date.getDate()}
              </p>
            </div>
          ) : (
            <div className="h-6 w-6 rounded-full items-center justify-center">
              <p className="font-light">{info.date.getDate()}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col rounded-sm">
          <p>{weekday}</p>
        </div>
      )}
    </div>
  );
};

type DayRenderProps = {
  info: DayCellContentArg;
};

const DayRender = ({ info }: DayRenderProps) => {
  return (
    <div className="flex">
      {info.view.type == 'dayGridMonth' && info.isToday ? (
        <div className="flex h-7 w-7 rounded-full bg-black dark:bg-white items-center justify-center text-sm text-white dark:text-black">
          {info.dayNumberText}
        </div>
      ) : (
        <div className="flex h-7 w-7 rounded-full items-center justify-center text-sm">
          {info.dayNumberText}
        </div>
      )}
    </div>
  );
};

interface CalendarState {
  earliestTime: Date;
  latestTime: Date;
  customRenderingMap: Map<string, CustomRendering<any>>;
}

const FullCalendarComponent = ({
  ...props
}: CalendarOptions & CalendarState) => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const earliestHour = dayjs(props.earliestTime).format('HH');
  const earliestMin = dayjs(props.earliestTime).format('mm');

  const latestHour = dayjs(props.latestTime).format('HH');
  const latestMin = dayjs(props.latestTime).format('mm');

  const calendarEarliestTime = `${earliestHour}:${earliestMin}`;
  const calendarLatestTime = `${latestHour}:${latestMin}`;

  return (
    <FullCalendar
      {...props}
      ref={calendarRef}
      timeZone="local"
      plugins={plugins}
      initialView="timeGridDay"
      headerToolbar={false}
      slotMinTime={calendarEarliestTime}
      slotMaxTime={calendarLatestTime}
      allDaySlot={false}
      firstDay={1}
      height="32vh"
      displayEventEnd={true}
      windowResizeDelay={0}
      events={props.events}
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
      nowIndicator
      editable
      selectable
    />
  );
};

export {
  FullCalendarComponent,
  EventItem,
  DayHeader,
  DayRender,
  FullCalendarNav,
};
