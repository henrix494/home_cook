"use client";
import React, { useState, useMemo } from "react";
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
  openUser?: string | null; // Make openUser optional
}

const getData = (props: any) => {
  getData(props);
};

export default function Table({ getProps, data }: any) {
  const [myEvents, setEvents] = useState<Event[]>([]);
  const { data: session } = useSession();
  const [oneEvent, setOneEvent] = useState<Event[]>([]);
  const handleSelectSlot = ({ start, end }: any) => {
    const title = window.prompt("New Event name");
    if (title) {
      const newEvent: any = {
        start,
        id: uuidv4(), // Generate a unique ID
        title,
        end,
        openUser: session?.user?.name || null,
      };
      setOneEvent(newEvent);
      setEvents((prev) => [...prev, newEvent]);

      getProps(newEvent);
    }
  };

  const handleSelectEvent = (e: any) => {};

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const EventTeswt = [
    {
      start: "2023-12-07T00:00:00.000+02:00 ",
      title: "test",
      end: "Sat Dec 08 2023 00:00:00 GMT+0200 ",
      allDay: true,
    },
  ];
  const eventsFromData = data.map((item: any) => ({
    title: item.title,
    allDay: false,
    start: new Date(item.start),
    end: new Date(item.finsh),
    openUser: item.openuser,
    id: item.id,
  }));
  console.log(data);
  return (
    <div>
      <div className="h-[500px] max-lg:h-[800px] ">
        <Calendar
          defaultView={"week"}
          events={eventsFromData}
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
                event.openUser === "paula" ? "selected-event" : "normal-event",
              style: {
                backgroundColor: event.openUser === "paula" ? "blue" : "red",
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
