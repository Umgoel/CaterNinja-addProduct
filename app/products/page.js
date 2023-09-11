"use client";
//old code attached below
import React, { useState, useEffect } from "react";
import { styles } from "./pagejs.css";
import Link from "next/link";

// import { revalidatePath } from "next/cache";
export default function Page() {
  const [products, setProducts] = useState([]);
  // revalidatePath("/");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const timestamp = Date.now();
        const url = `http://localhost:3000/api/submit/`;
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
          setProducts(data.result);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [products]);

  return (
    <>
      <div className="flex self-center">
        <table className="border-4">
          <thead className="border-4">
            <tr className="border-4">
              <td>ID</td>
              <td>Box name</td>
              <td>Price</td>
              <td>Email</td>
              <td>selectedOptions</td>
              <td>total Items</td>
            </tr>
          </thead>
          <tbody className="min-h-screen flex-col justify-between border-4">
            {products.map((item) => (
              <tr className="border-2 p-4" key={item.ID}>
                <td>{item.ID}</td>
                <td>{item.fullname}</td>
                <td>{item.price}</td>
                <td>{item.email}</td>
                <td>
                  {item.selectedOptions.map((option) => (
                    <span key={option.key}>
                      {option.foodName} {option.MenuLabel} <br />
                    </span>
                    // <span key={option.key}>{option.MenuLabel}</span>
                  ))}
                </td>
                <td>
                  {Object.entries(
                    item.selectedOptions.reduce((acc, option) => {
                      if (option.MenuLabel) {
                        acc[option.MenuLabel] =
                          (acc[option.MenuLabel] || 0) + 1;
                      }
                      return acc;
                    }, {})
                  ).map(([menuLabel, count]) => (
                    <div key={menuLabel}>
                      {count} {menuLabel}(s)
                    </div>
                  ))}
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