"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { v4 as uuidv4 } from "uuid"; // Import uuid
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
  const [oneEvent, setOneEvent] = useState<Event[]>([]);
  const [title, setTitle] = useState("");

  const [openUser, setOpenUser] = useState("paula");
  const handleSelectSlot = ({ start, end }: any) => {
    if (title && openUser) {
      const newEvent: any = {
        start,
        id: uuidv4(), // Generate a unique ID
        title,
        end,
        openUser: openUser,
      };
      setOneEvent(newEvent);
      setEvents((prev) => [...prev, newEvent]);
      getProps(newEvent);
    }
  };
  const handleSelectEvent = (e: any) => {};

  useEffect(() => {
    const eventsFromData = data.map((item: any) => ({
      title: item.title,
      allDay: false,
      start: new Date(item.start),
      end: new Date(item.finsh),
      openUser: item.openuser,
      id: item.id,
    }));
    const getOnlineData = async () => {
      const data = await fetch("api/getTasks", {
        cache: "reload",
      });
      const json = await data.json();
      const eventsFromData = json.data.map((item: any) => ({
        title: item.title,
        allDay: false,
        start: new Date(item.start),
        end: new Date(item.finsh),
        openUser: item.openuser,
        id: item.id,
      }));
      setEvents(eventsFromData);
    };

    getOnlineData();
  }, [oneEvent]);

  return (
    <div>
      <div
        className={`  bg-white flex flex-col justify-center items-center text-xl gap-5 border-b-2 border-black pb-5 pt-5 
        
        `}
      >
        <div className="flex  gap-5 ">
          <div>
            <select
              name="name"
              id="name"
              className=" border-2"
              onChange={(e) => setOpenUser(e.target.value)}
            >
              {" "}
              <option value="paula">פאולה</option>
              <option value="natan">נתן</option>
            </select>
            <label htmlFor="name">מבצעה המשימה </label>
          </div>
        </div>
        <div className="flex">
          <input
            className="border-2"
            id="title"
            name="title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />{" "}
          <label htmlFor="title">תיאור המשימה</label>
        </div>
      </div>
      <div className="h-[500px] max-lg:h-[800px] ">
        <Calendar
          defaultView={"week"}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
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
    </div>
  );
}
