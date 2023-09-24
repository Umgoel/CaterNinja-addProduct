import ConnectDB from "app/lib/mongodb";
import sales from "app/models/sales";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await ConnectDB();
    const data = await sales.find();
    return NextResponse.json(
      { result: data },
      // { success },
      // { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.log("Error in getSales GET function");
    console.log(error);
    // success = false;
    // return NextResponse.json({
    //   msg: "Unable to fetch contacts",
    //   success: false,
    // });

  }
  return NextResponse.json(
    { result: data },
    { success },
    // { headers: { "Cache-Control": "no-store" } }
  );
}