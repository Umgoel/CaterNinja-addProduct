"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AddProduct() {
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

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

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
  }
  return (
    <main>
      <form className="py-4 mt-4 border-2 flex flex-col gap-5">
        <label className="p-4 font-black">Enter New menu item :</label>
        <div>
          <label className="p-4 text-black" htmlFor="setKey">
            ID (key) :
          </label>
          <input
            className="border-2"
            onChange={(e) => setKey(e.target.value)}
            type="number"
            id="setKey"
            placeholder="New Option"
            name="setKey"
            value={key}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setCity">
            {" "}
            City :{" "}
          </label>
          <input
            className="border-2"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="setCity"
            placeholder="Dhanbad"
            name="setCity"
            value={city}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setMenuLabel">
            Menu-Label :
          </label>
          <input
            className="border-2"
            onChange={(e) => setMenuLabel(e.target.value)}
            type="text"
            id="setMenuLabel"
            placeholder="Main Course"
            name="setMenuLabel"
            value={MenuLabel}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setFoodName">
            Name :
          </label>
          <input
            className="border-2"
            onChange={(e) => setFoodName(e.target.value)}
            type="text"
            id="setFoodName"
            placeholder="Shahi Paneer"
            name="setFoodName"
            value={foodName}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setQType">
            QType :
          </label>
          <input
            className="border-2"
            onChange={(e) => setQType(e.target.value)}
            type="text"
            id="setQType"
            placeholder="kgs"
            name="setQType"
            value={qType}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setCuisine">
            Cuisine :
          </label>
          <input
            className="border-2"
            onChange={(e) => setCuisine(e.target.value)}
            type="text"
            id="setCuisine"
            placeholder="North Indian"
            name="setCuisine"
            value={cuisine}
          />
        </div>
        <div>
          {/* make this boolean */}
          <label className="p-4 text-black" htmlFor="setVeg">
            Veg :
          </label>
          <input
            className="border-2"
            onChange={(e) => setVeg(e.target.value)}
            type="text"
            id="setVeg"
            placeholder="Veg"
            name="setVeg"
            value={veg}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setMealType">
            MealType :
          </label>
          <input
            className="border-2"
            onChange={(e) => setMealType(e.target.value)}
            type="text"
            id="setMealType"
            placeholder="Main Course"
            name="setMealType"
            value={MealType}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setMeal">
            Meal :
          </label>
          <input
            className="border-2"
            onChange={(e) => setMeal(e.target.value)}
            type="text"
            id="setMeal"
            placeholder="express"
            name="setMeal"
            value={meal}
          />
        </div>
        <div>
          <label className="p-4 text-black" htmlFor="setSP">
            Selling price :
          </label>
          <input
            className="border-2"
            onChange={(e) => setSP(e.target.value)}
            type="number"
            id="setSP"
            placeholder="750"
            name="setSP"
            value={SP}
          />
        </div>
        <button
          type="button"
          className="p-3 bg-yellow-500"
          onClick={handleAddOption}
        >
          Add New Option
        </button>

      </form>
        <div>
        {errors && errors.map((error) => <div key={error}>{error}</div>)}
      </div>
      <Link href={"/"}>Go Back</Link>
    </main>
  );
}
