import ConnectDB from "@/app/lib/mongodb";
import Option from "@/app/models/option";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await ConnectDB();
    const data = await Option.find();
    return NextResponse.json(
      { result: data },
      // { success },
      // { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.log("Error in menu GET function");
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


// export async function DELETE(request, content) {
//   try {
//     await ConnectDB();
//     const key = content.params.key;
//     console.log("key = "+key);
//     const result = await Option.deleteOne(record); //deleteOne isnt working
//     if (result) {
//       return NextResponse.json({
//         msg: "Delete successful",
//         success: true,
//       });
//     } else {
//       return NextResponse.json({
//         msg: "Option not found",
//         success: false,
//       });
//     }
//   } catch (error) {
//     console.log("Error in deleteOpt DELETE function");
//     console.log(error);

//     return NextResponse.json({
//       msg: "Delete failed",
//       success: false,
//     });
//   }
// }


export async function DELETE(request, content) {
  const key = content.params.key;
  const record = {_id:key};
  await ConnectDB();
  const result = await Option.deleteOne(record);
  return NextResponse.json({result, success:true});
}


export async function POST(request) {
    const body = await request.json();
    console.log(
      body.key, body.city,  body.MenuLabel, body.foodName, body.qType,
      body.cuisine, body.veg, body.MealType, body.meal, body.SP,
    );
  
    try {
      await ConnectDB();
      await Option.create({
        key: body.key,
        city: body.city,
        MenuLabel: body.MenuLabel,
        foodName: body.foodName,
        qType: body.qType,
        cuisine: body.cuisine,
        veg: body.veg,
        MealType: body.MealType,
        meal: body.meal,
        SP: body.SP,
      });
  
      return NextResponse.json({
        msg: ["menu data sent successfully"],
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
          msg: "Unable to send MENU message",
          success: false,
        });
      }
    }
    // const savedUser = await addUser(req.body);
    // res.status(201).json(savedUser);
  }
