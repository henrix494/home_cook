import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const getItem = async () => {
  const { rows } = await sql`SELECT * FROM tasks `;

  return rows;
};
