"use client";
import React, { useState, useEffect } from "react";
import { styles } from "./pagejs.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const timestamp = Date.now();
        const url = `http://localhost:3000/api/addOpt/?_=${timestamp}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = await response.json();
        if (data) {
          setMenu(data.result);
        } else {
          setMenu([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMenu();
  }, []);
  const router = useRouter();
  const handleDelete = async (item) => {
    console.log(item._id);
    try {
      const response = await fetch("http://localhost:3000/api/deleteOpt/"+item._id,{
          method: "DELETE",
        });

      if (response.ok) {
        console.log("Delete successful");
        getMenu();  
        router.push("/menuDisplay");
      } else {
        // Handle error
        console.log("Delete failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="flex self-center">
      <table className="border-4">
        <thead className="border-4">
          <tr className="border-4">
            <td>Product ID (key)</td>
            <td>City</td>
            <td>MenuLabel</td>
            <td>foodName</td>
            <td>qType</td>
            <td>cuisine</td>
            <td>veg</td>
            <td>MealType</td>
            <td>meal</td>
            <td>SP</td>
          </tr>
        </thead>
        <tbody className="min-h-screen flex-col justify-between border-4">
          {menu.map((item) => (
            <tr className="border-2 p-4" key={item.key}>
              <td>{item.key}</td>
              <td>{item.city}</td>
              <td>{item.MenuLabel}</td>
              <td>{item.foodName}</td>
              <td>{item.qType}</td>
              <td>{item.cuisine}</td>
              <td>{item.veg}</td>
              <td>{item.MealType}</td>
              <td>{item.meal}</td>
              <td>{item.SP}</td>
              <td className="bg-yellow-300">
                <Link href={"menuDisplay/" + item._id}>Edit</Link>
              </td>
              <td className="bg-red-700">
                <button onClick={() => handleDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
    <Link href={"/"}>Go Back</Link>
    </>
  );
}
