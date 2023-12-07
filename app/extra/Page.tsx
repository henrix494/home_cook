"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signIn");
    },
  });
  return <div>asccas</div>;
}
