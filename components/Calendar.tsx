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
  const [myLocalEvent, setMyLocalEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [openUser, setOpenUser] = useState("paula");

  const handleSelectSlot = async ({ start, end }: any) => {
    if (title && openUser) {
      const newEvent: any = {
        start,
        id: uuidv4(),
        title,
        end,
        openUser,
      };
      setMyLocalEvents((prev) => [...prev, newEvent]);
      await setEvents((prev) => [...prev, newEvent]);
      await getProps(newEvent);

      // Assuming api/getTasks adds the new event to the database

      // Fetch the updated data after adding the new event
      const updatedData = await fetch("api/getTasks", { cache: "reload" });
      const updatedJson = await updatedData.json();

      const eventsFromData = updatedJson.data.map((item: any) => ({
        title: item.title,
        allDay: false,
        start: new Date(item.start),
        end: new Date(item.finsh),
        openUser: item.openuser,
        id: item.id,
      }));
      setEvents(eventsFromData);
    }
  };

  useEffect(() => {
    const eventsFromData = data.map((item: any) => ({
      title: item.title,
      allDay: false,
      start: new Date(item.start),
      end: new Date(item.finsh),
      openUser: item.openuser,
      id: item.id,
    }));

    setEvents(eventsFromData);
  }, [data]);

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
          events={myLocalEvent && myEvents}
          localizer={localizer}
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
