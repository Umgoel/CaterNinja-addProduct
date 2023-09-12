"use client";

import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default function Home() {

  const [ID, setID] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const [menu, setMenu] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [key, setKey] = useState("");
  const [city, setCity] = useState("");
  const [MenuLabel, setMenuLabel] = useState("");
  const [foodName, setFoodName] = useState("");
  const [qType, setQType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [veg, setVeg] = useState("");
  const [MealType, setMealType] = useState("");
  const [meal, setMeal] = useState("");
  const [SP, setSP] = useState("");

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

  function handleMultiSelect(selectedOptions) {
    setSelectedOptions(selectedOptions);
  }

  async function handleSubmit(e) {
    //files that affect this function - /api/submit , @/app/models/contact (database)
    e.preventDefault();
    try {
      const res = await fetch("/api/submit/", {
        method: "POST",
        body: JSON.stringify({
          ID,
          fullname,
          email,
          price,
          selectedOptions,
        }),
      });

      const { msg, success } = await res.json();
      setErrors(msg);
      setSuccess(success);

      if (success) {
        setID("");
        setEmail("");
        setFullname("");
        setPrice("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddOption(e) {
    //files that affect this function - /api/addOpt , @/app/models/option (database)
    e.preventDefault();

    try {
      const res = await fetch("/api/addOpt", {
        //update api
        method: "POST",
        body: JSON.stringify({
          key, //update key, value and then add multiple fields as per the given json
          city,
          MenuLabel,
          foodName,
          qType,
          cuisine,
          veg,
          MealType,
          meal,
          SP,
        }),
      });
      console.log(res);
      const { msg, success } = await res.json();
      setErrors(msg);
      setSuccess(success);

      console.log(msg);
      console.log(success);

      if (success) {
        setKey("");
      }
    } catch (error) {
      console.log(error);
    }
    // const newOption = {
    //   key: `option${options.length + 1}`,
    //   value: `Option ${options.length + 1}`,
    // };
    // setOptions([...options, newOption]);
  }
  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-2 flex flex-col gap-5"
      >
        <div>
          <label className="p-4 text-black" htmlFor="ID">
            ID :
          </label>
          <input
            className="border-2"
            onChange={(e) => setID(e.target.value)}
            type="number"
            id="ID"
            placeholder="5"
            name="ID"
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="fullname">
            Full Name
          </label>
          <input
            className="border-2"
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            id="fullname"
            placeholder="Umang Goel"
            name="fullName"
          />
        </div>
        <br />
        <div>
          <label className="p-4 text-black" htmlFor="email">
            Email
          </label>
          <input
            className="border-2"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="umang@gmail.com"
            name="email"
          />
        </div>
        <br />
        <div>
          <label className="p-4 text-black" htmlFor="price">
            price :
          </label>
          <input
            className="border-2"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="price"
            placeholder="5"
            name="price"
          />
        </div>
        <div>
          <label className="p-4 text-black" 
          // htmlFor="Food"
          >
            Choose Food Items :
          </label>
          <Multiselect
            options={menu}
            onSelect={handleMultiSelect}
            onRemove={handleMultiSelect}
            displayValue="foodName"
          />
        </div>
        <button className="p-3 bg-green-700 text-black font-bold" type="submit">
          Submit
        </button>
        <Link href={"/newProduct"}>
        <label className="p-4 font-black">Enter New menu item</label>
        </Link>
        <Link href={"/menuDisplay"}>
        <label className="p-4 font-black">view/edit individual items</label>
        </Link>
        <Link href={"/products"}>
        <label className="p-4 font-black">view combos</label>
        </Link>
      </form>
    </main>
  );
}
