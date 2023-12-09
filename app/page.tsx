import NavBar from "@/components/NavBar";
import MainCal from "@/components/MainCal";
import { sql } from "@vercel/postgres";
export default async function Home() {
  return (
    <main className=" text-black ">
      <NavBar />
      <MainCal />
    </main>
  );
}
