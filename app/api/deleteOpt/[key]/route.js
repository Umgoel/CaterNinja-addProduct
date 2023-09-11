import ConnectDB from "@/app/lib/mongodb";
import Option from "@/app/models/option";
import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request, content) {
    const key = content.params.key;
    const record = {_id:key};
    await ConnectDB();
    const result = await Option.deleteOne(record);
    return NextResponse.json({result, success:true});
  }