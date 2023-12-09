import { sql } from "@vercel/postgres";
import { cache } from "react";

export const getItem = cache(async () => {
  const { rows } = await sql`SELECT * FROM tasks `;

  return rows;
});
