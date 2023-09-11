import ConnectDB from "@/app/lib/mongodb";
import mongoose from "mongoose";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function GET(request) {
  "use server";
  try {
    await ConnectDB();
    const data = await Contact.find();
    return NextResponse.json(
      { result: data }
      // { success },
      // { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.log("Error in GET function");
    console.log(error);
    // success = false;
    // return NextResponse.json({
    //   msg: "Unable to fetch contacts",
    //   success: false,
    // });
  }
  return NextResponse.json(
    { result: data },
    { success }
    // { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request) {
  const body = await request.json();
  console.log(
    body.ID,
    body.fullname,
    body.email,
    body.price,
    body.selectedOptions
  );

  try {
    await ConnectDB();
    await Contact.create({
      ID: body.ID,
      fullname: body.fullname,
      email: body.email,
      price: body.price,
      selectedOptions: body.selectedOptions,
    });

    return NextResponse.json({
      msg: ["data sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }

      return NextResponse.json({
        msg: errorList,
        success: false,
      });
    } else {
      return NextResponse.json({
        msg: "Unable to send message",
        success: false,
      });
    }
  }
  // const savedUser = await addUser(req.body);
  // res.status(201).json(savedUser);
}
