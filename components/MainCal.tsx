import React from "react";
import Table from "./Calendar";
import { sql } from "@vercel/postgres";
export const dynamic = "force";
export const revalidate = 0;
import { getItem } from "@/app/utils/utils";

export default async function MainCal() {
  const getProps = async (props: any) => {
    "use server";

    await sql`INSERT INTO tasks( id, Openuser, Start, Title, Finsh) VALUES ( ${props.id}, ${props.openUser}, ${props.start}, ${props.title}, ${props.end})`;
  };

  const rows = await getItem();
  return (
    <div>
      <Table getProps={getProps} data={rows} />
    </div>
  );
}
