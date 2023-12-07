"use client";
import { signOut } from "next-auth/react";

export default function NavBar() {
  return (
    <nav className=" border-b-2 pb-2 text-center">
      {" "}
      <button
        onClick={() => {
          signOut();
        }}
      >
        צא
      </button>
    </nav>
  );
}
