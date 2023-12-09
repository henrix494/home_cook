import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, respone: NextResponse) {
  const { rows } = await sql`SELECT * FROM tasks `;
  revalidatePath("/");
  return NextResponse.json({ data: rows });
}
