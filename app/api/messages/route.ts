import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const sql = getSql();
    const id = Date.now().toString();
    await sql`
      INSERT INTO messages (id, name, email, subject, message, read, created_at)
      VALUES (${id}, ${name}, ${email}, ${subject ?? ""}, ${message}, FALSE, NOW())
    `;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT * FROM messages ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([]);
  }
}
