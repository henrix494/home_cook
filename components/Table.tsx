"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useSession } from "next-auth/react";
import Model from "./Model";
import "../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}
export default function Table() {
  const [myEvents, setEvents] = useState<Event[]>([]);
  const { data: session } = useSession();

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      const title = window.prompt("New Event name");
      if (title) {
        const newEvent = {
          id: uuidv4(), // Generate a unique ID
          title,
          start,
          end,
          openUser: session?.user?.name,
        };
        setEvents((prev) => [...prev, newEvent]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = (e: any) => {
    console.log(e);
    console.log(session);
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <div>
      <div className="h-[500px] max-lg:h-[800px] ">
        <Calendar
          defaultDate={defaultDate}
          defaultView={"week"}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          longPressThreshold={5}
          eventPropGetter={(event, start, end, isSelected) => {
            // Customize the appearance of events based on your requirements
            return {
              className:
                session?.user?.name === "paula"
                  ? "selected-event"
                  : "normal-event",
              style: {
                backgroundColor:
                  session?.user?.name === "paula" ? "blue" : "red",
                // Add any other styles as needed
              },
            };
          }}
        />
      </div>
      <Model />
    </div>
  );
}
