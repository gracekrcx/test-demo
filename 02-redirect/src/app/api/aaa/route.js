import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("------------>", id);
  return NextResponse.json({ about: 555 });
}

export async function POST(request) {
  const cookieStore = cookies();
  console.log("--SERVER---> api --2--->", cookieStore);
  return Response.json({ data: "951" });
}
