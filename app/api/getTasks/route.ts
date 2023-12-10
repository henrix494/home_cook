import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, respone: NextResponse) {
  const { rows } = await sql`SELECT * FROM tasks `;
  revalidatePath("https://home-cook-weld.vercel.app/");
  return NextResponse.json({ data: rows });
}
