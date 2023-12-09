"use client";
import { useState } from "react";
interface props {
  isModel: boolean;
}

export default function Model({ isModel }: props) {
  return (
    <div
      className={` w-[600px] h-[300px] border-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white flex flex-col justify-center items-center text-xl gap-5 ${
        !isModel ? " absolute" : " hidden"
      }`}
    >
      <div className="flex  gap-5 ">
        <div>
          <select name="name" id="name" className=" border-2">
            {" "}
            <option value="paula">פאולה</option>
            <option value="natan">נתן</option>
          </select>
          <label htmlFor="name">מבצעה המשימה </label>
        </div>
      </div>
      <div className="flex">
        <input className="border-2" id="title" name="title" type="text" />{" "}
        <label htmlFor="title">תיאור המשימה</label>
      </div>
    </div>
  );
}
