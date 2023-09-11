import ConnectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Option from "@/app/models/option";

export async function PUT(request, content) {
  const key = content.params.key;
  const filter = { _id: key };
  const payload = await request.json();
  // console.log(payload);
  await ConnectDB();
  const result = await Option.findOneAndUpdate(filter, payload);
  return NextResponse.json({ result, success: true });
}
export async function GET(request, content) {
  const key = content.params.key;
  const record = { _id: key };
  await ConnectDB();
  const result = await Option.findById(record);
  return NextResponse.json({ result, success: true });
}
