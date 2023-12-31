"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import natan from "@/public/natan.jpg";
import paula from "@/public/paula.jpg";
export default function LoginComp() {
  const router = useRouter();
  const [iSclicked, setIsClicked] = useState({
    userOne: false,
    userTwo: false,
    userNameOne: "",
    userNameTwo: "",
  });

  const [passwords, setPasswords] = useState({
    userOne: "",
    userTwo: "",
  });

  const { data: session, status } = useSession();
  const handleSignIn = (user: any) => {
    signIn("credentials", {
      username: iSclicked.userNameOne
        ? iSclicked.userNameOne
        : iSclicked.userNameTwo,
      password: passwords.userOne ? passwords.userOne : passwords.userTwo,
      redirect: false,
    }).then((response) => {
      if (response?.ok) {
        router.push("/");
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col z-20 text-white dev max-lg:h-full">
      <p className="mb-10 text-4xl ">?מי זה</p>
      <div className="flex gap-10 max-lg:flex-col">
        <div className="flex flex-col items-center gap-10">
          <Image
            className="rounded-full w-[200px] h-[300px] hover:scale-110 transition-all cursor-pointer"
            src={paula}
            width={200}
            height={200}
            alt="asc"
            onClick={() => {
              setIsClicked((prev) => ({
                ...prev,
                userOne: !prev.userOne,
                userNameOne: "paula",
              }));
            }}
          />
          <input
            placeholder="סיסמה"
            className={`text-black transition-all rounded-lg p-2 ${
              iSclicked.userOne ? `opacity-1` : "opacity-0"
            }`}
            type="password"
            value={passwords.userOne}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                userOne: e.target.value,
                userTwo: "",
              }))
            }
            disabled={!iSclicked.userOne}
          />
          <button
            className={`${
              iSclicked.userOne ? `opacity-1` : "opacity-0"
            } transition-all`}
            onClick={() => handleSignIn("One")}
          >
            Sign In
          </button>
        </div>

        <div className="flex flex-col items-center gap-10">
          <Image
            className="rounded-full w-[300px] h-[300px] hover:scale-110 transition-all cursor-pointer"
            src={natan}
            width={200}
            height={200}
            alt="asc"
            onClick={() => {
              setIsClicked((prev) => ({
                ...prev,
                userTwo: !prev.userTwo,
                userNameOne: "",
                userNameTwo: "natan",
              }));
            }}
          />
          <input
            placeholder="סיסמה"
            className={`text-black transition-all rounded-lg p-2 ${
              iSclicked.userTwo ? `opacity-1` : "opacity-0"
            }`}
            type="password"
            value={passwords.userTwo}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                userTwo: e.target.value,
                userOne: "",
              }))
            }
            disabled={!iSclicked.userTwo}
          />
          <button
            className={`${
              iSclicked.userTwo ? `opacity-1` : "opacity-0"
            } transition-all`}
            onClick={() => handleSignIn("Two")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
