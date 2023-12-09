import { sql } from "@vercel/postgres";

export const getItem = async () => {
  const { rows } = await sql`SELECT * FROM tasks `;

  return rows;
};
