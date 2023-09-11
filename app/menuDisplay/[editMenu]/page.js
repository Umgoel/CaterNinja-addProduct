"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function Home({ params }) {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const [menu, setMenu] = useState([]);
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
    // console.log(params.editMenu);
    getMenuDetails();
  }, []);

  const getMenuDetails = async () => {
    let menuKey = params.editMenu;
    let menuData = await fetch("http://localhost:3000/api/editOpt/" + menuKey);
    menuData = await menuData.json();
    if (menuData.success) {
      let res = menuData.result;
      setKey(res.key);
      setCity(res.city);
      setMenuLabel(res.MenuLabel);
      setFoodName(res.foodName);
      setQType(res.qType);
      setCuisine(res.cuisine);
      setVeg(res.veg);
      setMealType(res.MealType);
      setMeal(res.meal);
      setSP(res.SP);
    }
  };

  const updateOption = async () => {
    let menuKey = params.editMenu;
    let data = await fetch("http://localhost:3000/api/editOpt/" + menuKey, {
      method: "PUT",
      body : JSON.stringify({key,city,MenuLabel, foodName, qType, cuisine, veg, MealType, meal, SP})
    });

    data = await data.json();
     if(data.result){
        alert("Product has been updated");
     }
  };

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
          onClick={updateOption}
        >
          updateOption
        </button>
      </form>
      <Link href={"/menuDisplay"}>Go to menuDisplay</Link>
    </main>
  );
}
