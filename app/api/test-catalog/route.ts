import { testCatalog } from "@/data/tests";
import { NextResponse } from "next/server";

export async function GET() {
  const tests = testCatalog.map((t) => ({ id: t.id, title: t.title }));
  return NextResponse.json({ tests });
}
