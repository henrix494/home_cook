"use client";
import React, { Fragment, useState, useCallback, useMemo } from "react";

import { Calendar, Week, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment); // or globalizeLocalizer
import "../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

export default function Table() {
  const events = [
    {
      id: 27,
      title: "DST starts on this day (Europe)",
      start: new Date(2023, 2, 26, 0, 0, 0),
      end: new Date(2023, 2, 26, 4, 30, 0),
    },
  ];
  const [myEvents, setEvents] = useState(events);
  interface Event {
    start: Date;
    end: Date;

    // Add other properties as needed
  }
  const handleSelectSlot = useCallback(
    ({ start, end }: Event) => {
      const title = window.prompt("New Event name");
      if (title) {
        setEvents((prev: any) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: any) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  return (
    <div>
      <div className="h-[500px]">
        <Calendar
          defaultDate={defaultDate}
          defaultView={"week"}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
      </div>
    </div>
  );
}
