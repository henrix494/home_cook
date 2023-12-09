import { sql } from "@vercel/postgres";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, respone: NextResponse) {
  const { rows } = await sql`SELECT * FROM tasks `;

  return NextResponse.json({ data: rows });
}
